import type { VercelRequest, VercelResponse } from "@vercel/node";

const CRM_TOKEN = process.env.CRM_TOKEN || "AFF_1_92cbc1bc76284e19b711bab22587d75f";
const CRM_URL = process.env.CRM_URL || "https://inwo.crmcore.me/api/lead_management/api/affiliates";

function sanitize(str: string): string {
  return String(str)
    .trim()
    .replace(/[<>"'&]/g, "");
}

const DIAL_CODES: Record<string, string> = {
  CH: "41", FR: "33", BE: "32", CA: "1", US: "1", GB: "44", DE: "49", ES: "34", IT: "39", NL: "31", SE: "46", AU: "61", IN: "91", AE: "971", SG: "65", ZA: "27", BR: "55", MX: "52", JP: "81", CY: "357"
};

function formatPhone(inputPhone: string, countryCode: string): string {
  let phone = (inputPhone || "").replace(/[^0-9+]/g, "");
  if (!phone) return "0000000000";

  let rawDial = DIAL_CODES[countryCode] || "41";
  
  if (phone.startsWith("00")) phone = phone.slice(2);
  if (phone.startsWith("+")) phone = phone.slice(1);
  
  if (phone.startsWith(rawDial)) {
      phone = phone.slice(rawDial.length);
  }
  
  if (phone.startsWith("0")) {
      phone = phone.slice(1);
  }
  
  return "00" + rawDial + phone;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone: inputPhone, message, amount, countryCode = "CH", leadType = "contact" } = req.body ?? {};

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

  const phoneFormatted = formatPhone(cleanPhone, countryCode);
  const countryName = (countryCode || "CH").toLowerCase();

  const payload = {
    country_name: countryName,
    description: "Elite Chain",
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
    let parsedBody: any = {};
    try {
      parsedBody = JSON.parse(responseBody);
    } catch (e) {}

    const isAlreadyExist =
      responseBody.includes("already exist") ||
      responseBody.includes("already registered") ||
      (parsedBody && parsedBody.error && parsedBody.error.includes("already exist"));

    if (crmResponse.ok || isAlreadyExist) {
      try {
        const url = (typeof process !== 'undefined' && process.env && process.env.VITE_DASHBOARD_URL) || "https://lead-dashboard-orcin.vercel.app/api/increment";
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ website: "Elite Chain", type: leadType, name: first_name + ' ' + last_name, email: cleanEmail})
        }).catch(() => {});
      } catch(e){}
    }

    if (!crmResponse.ok) {
      if (isAlreadyExist) {
        return res.status(200).json({ success: true, message: "Account already exists" });
      }
      console.warn("CRM non-ok response:", responseBody);
      return res.status(200).json({ success: true, ignoredError: true, details: responseBody });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("CRM proxy error:", err);
    return res.status(200).json({ success: true, ignoredError: true });
  }
}
