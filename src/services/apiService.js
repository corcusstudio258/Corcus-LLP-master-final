export async function submitLead(formData, meta = {}) {
  const payload = {
    ...formData,
    ...meta,
  };

  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Lead submission failed: ${response.status} ${text}`);
  }

  return response.json();
}
