export const GOOGLE_SHEET_ID = "1KrS1vB9EzYV21NeOJf6z6Ls71adx509R_3Mnm2cdI_k";
export const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwfbaeYaS3OcU4P6Uy8-RoOUl-4Os8LMJItHM778quPrLBOR8gGThy-wao8ZmWD0T1X/exec";
export const GOOGLE_RECIPIENT_EMAIL = "corcusweb@gmail.com";
export const GOOGLE_SUBJECT = "New contact form submission from Corcus website";
export const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1KrS1vB9EzYV21NeOJf6z6Ls71adx509R_3Mnm2cdI_k/edit";

function normalizeSubmissionPayload(payload) {
  const normalized = { ...payload };
  const aliases = {
    Name: ["name"],
    Email: ["email"],
    Contact: ["contact", "phone"],
    Phone: ["phone", "contact"],
    Message: ["message", "msg"],
    Business: ["business", "company", "companyName"],
    Services: ["services", "service"],
    Projectname: ["projectname", "project_name", "project"],
    sheetId: ["sheet_id", "spreadsheetId", "spreadsheet_id"],
    spreadsheetId: ["spreadsheet_id", "sheetId", "sheet_id"],
    sheetURL: ["sheetURL", "sheet_url", "spreadsheetUrl", "spreadsheet_url"],
    spreadsheetUrl: ["spreadsheetUrl", "spreadsheet_url", "sheetURL", "sheet_url"],
    recipient: ["recipient", "recipientEmail", "recipient_email", "to", "email"],
    subject: ["subject", "mailSubject", "mail_subject"],
    source: ["source", "form_source", "formSource"],
    formName: ["formName", "form_name"],
  };

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    const lowerKey = key.toLowerCase();
    if (!(lowerKey in normalized)) {
      normalized[lowerKey] = value;
    }

    const aliasList = aliases[key] || [];
    aliasList.forEach((aliasKey) => {
      if (!(aliasKey in normalized)) {
        normalized[aliasKey] = value;
      }
    });
  });

  return normalized;
}

export async function submitFormSubmission(formData, meta = {}) {
  const payload = {
    ...formData,
    ...meta,
    sheetId: GOOGLE_SHEET_ID,
    spreadsheetId: GOOGLE_SHEET_ID,
    sheetURL: GOOGLE_SHEET_URL,
    spreadsheetUrl: GOOGLE_SHEET_URL,
    recipient: GOOGLE_RECIPIENT_EMAIL,
    to: GOOGLE_RECIPIENT_EMAIL,
    recipientEmail: GOOGLE_RECIPIENT_EMAIL,
    email: GOOGLE_RECIPIENT_EMAIL,
    subject: GOOGLE_SUBJECT,
    mailSubject: GOOGLE_SUBJECT,
  };

  const normalizedPayload = normalizeSubmissionPayload(payload);
  const body = new URLSearchParams();
  Object.entries(normalizedPayload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      body.append(key, String(value));
    }
  });

  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`Submission failed with status ${response.status}`);
  }

  return response.text();
}
