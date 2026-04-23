import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_SCRIPT_URL =
  process.env.GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbwfbaeYaS3OcU4P6Uy8-RoOUl-4Os8LMJItHM778quPrLBOR8gGThy-wao8ZmWD0T1X/exec";
const GOOGLE_SHEET_ID =
  process.env.GOOGLE_SHEET_ID ||
  "1KrS1vB9EzYV21NeOJf6z6Ls71adx509R_3Mnm2cdI_k";
const EMAIL_TO = process.env.EMAIL_TO || "corcusweb@gmail.com";
const EMAIL_FROM = process.env.EMAIL_FROM || process.env.EMAIL_USER;

const transporter =
  process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS
    ? nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT || 587),
        secure: process.env.EMAIL_SECURE === "true",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })
    : null;

function normalizePayload(payload) {
  const normalized = { ...payload };
  const aliases = {
    name: ["Name"],
    email: ["Email", "recipient", "recipientEmail", "to"],
    phone: ["Phone", "Contact"],
    contact: ["Contact", "Phone"],
    message: ["Message", "msg"],
    business: ["Business"],
    services: ["Services"],
    projectname: ["Projectname", "project"],
    sheetId: ["sheetId", "spreadsheetId"],
    spreadsheetId: ["spreadsheetId", "sheetId"],
    subject: ["subject", "mailSubject"],
    source: ["source", "formSource"],
    formName: ["formName", "form_name"],
  };

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    const lowerKey = key.toLowerCase();
    if (!(lowerKey in normalized)) {
      normalized[lowerKey] = value;
    }

    const aliasList = aliases[lowerKey] || [];
    aliasList.forEach((aliasKey) => {
      if (!(aliasKey in normalized)) {
        normalized[aliasKey] = value;
      }
    });
  });

  return normalized;
}

function buildScriptPayload(formData) {
  return normalizePayload({
    ...formData,
    sheetId: GOOGLE_SHEET_ID,
    spreadsheetId: GOOGLE_SHEET_ID,
    recipient: EMAIL_TO,
    to: EMAIL_TO,
    recipientEmail: EMAIL_TO,
    email: EMAIL_TO,
    subject:
      formData.subject || "New contact form submission from Corcus website",
    mailSubject:
      formData.mailSubject || "New contact form submission from Corcus website",
    source: formData.source || "frontend lead form",
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData = req.body || {};
    const scriptPayload = buildScriptPayload(formData);
    const body = new URLSearchParams();

    Object.entries(scriptPayload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        body.append(key, String(value));
      }
    });

    const scriptResponse = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const sheetResponse = await scriptResponse.text();

    let emailStatus = null;
    if (transporter && EMAIL_FROM) {
      const messageBody = Object.entries(formData)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");

      const mailResult = await transporter.sendMail({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: `Lead received: ${formData.subject || "New lead"}`,
        text: messageBody,
      });
      emailStatus = mailResult.response;
    }

    return res.status(200).json({
      success: true,
      sheetResponse,
      emailStatus,
    });
  } catch (error) {
    console.error("Lead submission error:", error);
    return res.status(500).json({
      error: "Lead submission failed",
      details: error.message || "unknown error",
    });
  }
}
