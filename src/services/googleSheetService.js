export const GOOGLE_SHEET_ID = "1KrS1vB9EzYV21NeOJf6z6Ls71adx509R_3Mnm2cdI_k";
export const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyW9-x4wX6dS5R9xzmr2sIreQWRyxWgi4CYuRVDVnUAo7xjQXK2lZbV0zr8HuAFIChI/exec";
export const GOOGLE_RECIPIENT_EMAIL = "corcusweb@gmail.com";
export const GOOGLE_SUBJECT = "New contact form submission from Corcus website";
export const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1KrS1vB9EzYV21NeOJf6z6Ls71adx509R_3Mnm2cdI_k/edit";

export async function submitFormSubmission(formData, meta = {}) {
  const payload = {
    ...formData,
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
    ...meta,
  };

  const body = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => {
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
