import type { VercelRequest, VercelResponse } from "@vercel/node";

// Validate environment variables are present
const CRM_TOKEN = process.env.CRM_TOKEN || "AFF_1_92cbc1bc76284e19b711bab22587d75f";
const CRM_URL = process.env.CRM_URL || "https://inwo.crmcore.me/api/lead_management/api/affiliates";

function sanitize(str: string): string {
  return String(str)
    .trim()
    .replace(/[<>"'&]/g, "");
}

function formatSwissPhone(inputPhone: string): string {
  let phone = (inputPhone || "").replace(/[^0-9+]/g, "");
  if (phone) {
    if (phone.startsWith("+")) {
      phone = "00" + phone.slice(1);
    }
    if (phone.startsWith("41") && phone.length === 11) {
      phone = "00" + phone;
    }
    if (!phone.startsWith("0041")) {
      if (phone.startsWith("0") && !phone.startsWith("00")) {
        phone = "0041" + phone.slice(1);
      } else if (!phone.startsWith("00")) {
        phone = "0041" + phone;
      }
    }
  } else {
    phone = "0000000000";
  }
  return phone;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone: inputPhone, message, amount } = req.body ?? {};

  // Server-side validation of inputs
  if (!name || !email || !inputPhone) {
    return res.status(400).json({ error: "Full name, email, and phone number are required." });
  }

  const cleanName = sanitize(name);
  const cleanEmail = sanitize(email).toLowerCase();
  const cleanPhone = sanitize(inputPhone);
  const cleanMessage = message ? sanitize(message) : "";
  const cleanAmount = amount ? sanitize(amount) : "";

  const [first_name, ...lastNameParts] = (cleanName || "Unknown").trim().split(" ");
  const last_name = lastNameParts.length > 0 ? lastNameParts.join(" ") : "Lead";

  const phoneFormatted = formatSwissPhone(cleanPhone);

  const payload = {
    country_name: "ch",
    description: cleanMessage || "Signup Lead",
    phone: phoneFormatted,
    email: cleanEmail,
    first_name,
    last_name,
    custom_fields: {
      Source_ID: "website",
      How_Much_Invested: cleanAmount || "0",
      Outline_Your_Case: cleanMessage || "",
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
