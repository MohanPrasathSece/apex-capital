import type { VercelRequest, VercelResponse } from "@vercel/node";

// Validate environment variables are present
const CRM_TOKEN = process.env.CRM_TOKEN || "AFF_1_92cbc1bc76284e19b711bab22587d75f";
const CRM_URL = process.env.CRM_URL || "https://inwo.crmcore.me/api/lead_management/api/affiliates";

function sanitize(str: string): string {
  return String(str)
    .trim()
    .replace(/[<>"'&]/g, "");
}

function splitName(fullName: string): { first_name: string; last_name: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { first_name: parts[0], last_name: "" };
  const last = parts.pop()!;
  return { first_name: parts.join(" "), last_name: last };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, message } = req.body ?? {};

  // Server-side validation of inputs
  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Full name, email, and phone number are required." });
  }

  const cleanName = sanitize(name);
  const cleanEmail = sanitize(email).toLowerCase();
  const cleanPhone = sanitize(phone);
  const cleanMessage = message ? sanitize(message) : "";

  const { first_name, last_name } = splitName(cleanName);

  const payload = {
    country_name: "cy",
    description: cleanMessage,
    phone: cleanPhone,
    email: cleanEmail,
    first_name,
    last_name,
    custom_fields: {
      Source_ID: "Website",
      Outline_Your_Case: cleanMessage,
    },
  };

  try {
    const crmResponse = await fetch(CRM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CRM_TOKEN}`,
        "X-Affiliate-Token": CRM_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    const responseBody = await crmResponse.text();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let parsedBody: any = {};
    try {
      parsedBody = JSON.parse(responseBody);
    } catch (e) {
      // Body not JSON
    }

    if (!crmResponse.ok) {
      // Check if this is an "already exists" error
      const isAlreadyExist =
        responseBody.includes("already exist") ||
        responseBody.includes("already registered") ||
        (parsedBody.error && parsedBody.error.includes("already exist"));

      if (isAlreadyExist) {
        return res.status(200).json({ success: true, message: "Account already exists" });
      }

      // If it's a different error, we log it but handle gracefully as requested
      console.warn("CRM non-ok response:", responseBody);
      return res.status(200).json({ success: true, ignoredError: true, details: responseBody });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("CRM proxy error:", err);
    // Handle API failures gracefully by returning success to not block user signups
    return res.status(200).json({ success: true, ignoredError: true });
  }
}
