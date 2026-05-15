import express from "express";
import "dotenv/config";

const app = express();
<<<<<<< HEAD
const port = process.env.PORT || 4174;
=======
const port = process.env.PORT || 5000;
>>>>>>> 09c7693e342766a241322bd2257a7abe178008e0

app.use(express.json());

app.post("/api/send-email", async (req, res) => {
  const { name, company = "", email, message } = req.body || {};

  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO_EMAIL || "abhishekkushwaha4732@gmail.com";
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey) {
<<<<<<< HEAD
=======
    console.error("Missing RESEND_API_KEY environment variable");
>>>>>>> 09c7693e342766a241322bd2257a7abe178008e0
    res.status(500).json({ error: "Missing RESEND_API_KEY" });
    return;
  }

  const html = `
    <h2>New contact form lead</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to,
        subject: `New lead from ${name}${company ? ` - ${company}` : ""}`,
        html,
      }),
    });

    const payload = await response.text();
    if (!response.ok) {
      console.error("Resend error", response.status, payload);
      res.status(502).json({ error: "Failed to send email" });
      return;
    }

    res.status(200).json({ ok: true, result: payload });
  } catch (error) {
    console.error("send-email failed", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
