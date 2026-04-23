import express from "express";
import cors from "cors";
import axios from "axios";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { URLSearchParams } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const GOOGLE_SCRIPT_URL =
  process.env.GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbz1rS7QcpdvIHbKZVRufEkTfxni3uJT__iVGHVvSPOQDhRQH-8UUr3TwgvmXy2stEmz/exec";
const GOOGLE_SHEET_ID =
  process.env.GOOGLE_SHEET_ID ||
  "1KrS1vB9EzYV21NeOJf6z6Ls71adx509R_3Mnm2cdI_k";
const EMAIL_TO = process.env.EMAIL_TO || "corcusweb@gmail.com";
const EMAIL_FROM = process.env.EMAIL_FROM || process.env.EMAIL_USER;

const emailTransporter =
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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

function buildScriptPayload(formData) {
  return {
    ...formData,
    sheetId: GOOGLE_SHEET_ID,
    spreadsheetId: GOOGLE_SHEET_ID,
    recipient: EMAIL_TO,
    to: EMAIL_TO,
    recipientEmail: EMAIL_TO,
    email: EMAIL_TO,
    subject:
      formData.subject || "New contact form submission from Corcus website",
    source: formData.source || "frontend lead form",
  };
}

app.post("/api/leads", async (req, res) => {
  try {
    const formData = req.body;
    const scriptPayload = buildScriptPayload(formData);
    const body = new URLSearchParams();

    Object.entries(scriptPayload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        body.append(key, String(value));
      }
    });

    const scriptResponse = await axios.post(GOOGLE_SCRIPT_URL, body.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    let emailStatus = null;
    if (emailTransporter && EMAIL_FROM) {
      const message = `New lead received:\n\n${Object.entries(formData)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")}`;

      const mailResult = await emailTransporter.sendMail({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: `Lead received: ${formData.subject || "New lead"}`,
        text: message,
      });

      emailStatus = mailResult.response;
    }

    res.json({
      success: true,
      sheetResponse: scriptResponse.data,
      emailStatus,
    });
  } catch (error) {
    console.error("Lead submission error:", error?.response?.data || error.message || error);
    res.status(500).json({ error: "Lead submission failed", details: error?.message || "unknown" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
