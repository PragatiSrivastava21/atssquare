import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4174;

app.use(express.json());

app.post("/api/send-email", async (req, res) => {
  const { name, company = "", email, message } = req.body || {};

  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO_EMAIL || "pragatisri21@gmail.com";
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey) {
    console.error("Missing RESEND_API_KEY");
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

const server = app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});

server.on("error", (err) => {
  if (err && err.code === "EADDRINUSE") {
    console.error(
      `Port ${port} is already in use. Another process may be running. Run: npx kill-port ${port}`
    );
    process.exit(1);
  }
  console.error("Server error:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}