import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put, list } from "@vercel/blob";
import { randomUUID } from "crypto";

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

function sanitize(str: string): string {
  return String(str)
    .trim()
    .replace(/[<>"'&]/g, "");
}

const DIAL_CODES: Record<string, string> = {
  CH: "41", FR: "33", BE: "32", CA: "1", US: "1", GB: "44", DE: "49", ES: "34", IT: "39", NL: "31", SE: "46", AU: "61", IN: "91", AE: "971", SG: "65", ZA: "27", BR: "55", MX: "52", JP: "81", CY: "357"
};

function formatPhoneStandard(inputPhone: string, countryCode: string): string {
  let phone = (inputPhone || "").replace(/[^0-9+]/g, "");
  if (!phone) return "";

  let rawDial = DIAL_CODES[countryCode] || "41";
  
  if (phone.startsWith("00")) phone = phone.slice(2);
  if (phone.startsWith("+")) phone = phone.slice(1);
  
  if (phone.startsWith(rawDial)) {
      phone = phone.slice(rawDial.length);
  }
  
  if (phone.startsWith("0")) {
      phone = phone.slice(1);
  }
  
  return "+" + rawDial + phone;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, action = "login", name, phone, countryCode = "CH" } = req.body ?? {};

  if (!email) {
    return res.status(400).json({ error: "Email address is required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(email))) {
    return res.status(400).json({ error: "Email address is invalid." });
  }

  const cleanEmail = sanitize(String(email)).toLowerCase();

  // Development mode fallback when BLOB_READ_WRITE_TOKEN is missing
  if (!BLOB_TOKEN) {
    console.warn("BLOB_READ_WRITE_TOKEN is missing. Issuing a local development mock token.");
    const devToken = `dev_${randomUUID()}`;
    return res.status(200).json({
      success: true,
      token: devToken,
      email: cleanEmail,
      name: name ? sanitize(name) : cleanEmail.split("@")[0],
    });
  }

  try {
    // Check if user exists in the "users" prefix in Vercel Blob
    const { blobs } = await list({
      prefix: `users/${cleanEmail}.json`,
      token: BLOB_TOKEN,
    });

    const userFileExists = blobs.some((b) => b.pathname === `users/${cleanEmail}.json`);

    let userName = name ? sanitize(name) : cleanEmail.split("@")[0];

    if (action === "signup") {
      if (!userFileExists) {
        // Create new user file
        const formattedPhone = formatPhoneStandard(phone, countryCode);
        const userData = {
          email: cleanEmail,
          name: userName,
          phone: formattedPhone,
          country: countryCode.toLowerCase(),
          createdAt: new Date().toISOString(),
        };

        await put(`users/${cleanEmail}.json`, JSON.stringify(userData), {
          access: "public",
          token: BLOB_TOKEN,
          contentType: "application/json",
          addRandomSuffix: false,
          cacheControl: "no-store, no-cache, must-revalidate, max-age=0",
        });
      } else {
        return res.status(400).json({ error: "An account with this email already exists." });
      }
    } else {
      // login action
      if (!userFileExists) {
        return res
          .status(400)
          .json({ error: "No account found with this email. Please sign up first." });
      }

      // Fetch existing user details if available to return to frontend
      try {
        const userBlob = blobs.find((b) => b.pathname === `users/${cleanEmail}.json`);
        if (userBlob) {
          const userResponse = await fetch(`${userBlob.url}?t=${Date.now()}`, {
            headers: {
              Authorization: `Bearer ${BLOB_TOKEN}`,
            },
          });
          if (userResponse.ok) {
            const userData = await userResponse.json();
            if (userData.name) userName = userData.name;
          }
        }
      } catch (err) {
        console.warn("Could not read user file info from Blob, using email prefix fallback:", err);
      }
    }

    // Create session token and record session
    const sessionToken = randomUUID();
    const sessionData = {
      email: cleanEmail,
      token: sessionToken,
      name: userName,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    };

    // Store session in Vercel Blob
    await put(`sessions/${sessionToken}.json`, JSON.stringify(sessionData), {
      access: "public",
      token: BLOB_TOKEN,
      contentType: "application/json",
      cacheControl: "no-store, no-cache, must-revalidate, max-age=0",
    });

    return res.status(200).json({
      success: true,
      token: sessionToken,
      email: cleanEmail,
      name: userName,
    });
  } catch (err) {
    console.error("Blob auth error:", err);
    return res.status(500).json({ error: "Failed to connect to user database. Please try again." });
  }
}
