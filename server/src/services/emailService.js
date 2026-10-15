// ==============================================================================
// Brevo Email Notification Service (HTTPS REST API)
// Compatible with Render, Vercel, Railway, AWS (No blocked SMTP ports)
// ==============================================================================

/**
 * Sends a notification email when a new contact message is submitted.
 * Uses Brevo's HTTPS REST API (Port 443) which is 100% allowed on Render.
 *
 * @param {{ name: string, email: string, message: string }} details
 * @returns {Promise<{ sent: boolean, error?: string }>}
 */
async function sendContactNotification({ name, email, message }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.BREVO_SENDER;
  const recipientEmail = process.env.NOTIFICATION_EMAIL || process.env.NOTIFY_TO || senderEmail;

  // If Brevo is not yet configured in .env, skip gracefully without crashing
  if (!apiKey || !senderEmail || !recipientEmail) {
    console.warn(
      '⚠️ Brevo email notification skipped: Missing BREVO_API_KEY, BREVO_SENDER, or NOTIFY_TO in .env'
    );
    return { sent: false, error: 'Email service not configured in .env' };
  }

  const payload = {
    sender: {
      name: 'Portfolio Contact Form',
      email: senderEmail
    },
    to: [
      {
        email: recipientEmail,
        name: 'Roswell Cruz'
      }
    ],
    replyTo: {
      email: email,
      name: name
    },
    subject: `📬 New Portfolio Message from ${name}`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f1f5f9; padding: 20px; }
          .card { max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #3b82f6, #6366f1); padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 20px; color: #ffffff; letter-spacing: -0.025em; }
          .content { padding: 24px; }
          .field { margin-bottom: 16px; }
          .label { font-size: 12px; font-weight: 600; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-bottom: 4px; }
          .value { font-size: 15px; color: #f8fafc; word-break: break-word; }
          .message-box { background-color: #1e293b; border-left: 4px solid #6366f1; padding: 16px; border-radius: 6px; margin-top: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #e2e8f0; }
          .footer { padding: 16px 24px; background-color: #0f172a; border-top: 1px solid #1e293b; text-align: center; font-size: 13px; color: #64748b; }
          .button { display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px; margin-top: 12px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>New Message from Your Portfolio</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Sender Name</div>
              <div class="value"><strong>${name}</strong></div>
            </div>
            <div class="field">
              <div class="label">Sender Email</div>
              <div class="value"><a href="mailto:${email}" style="color: #60a5fa;">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="message-box">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            </div>
            <div style="text-align: center; margin-top: 24px;">
              <a href="mailto:${email}?subject=Re:%20Portfolio%20Inquiry" class="button">Reply to ${name}</a>
            </div>
          </div>
          <div class="footer">
            Sent securely via Roswell Cruz Portfolio API & Brevo
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Brevo API error response:', data);
      return { sent: false, error: data.message || 'Failed to send via Brevo' };
    }

    console.log(`✅ Brevo notification email sent successfully! MessageId: ${data.messageId}`);
    return { sent: true, messageId: data.messageId };
  } catch (error) {
    console.error('❌ Network error sending email via Brevo:', error.message);
    return { sent: false, error: error.message };
  }
}

module.exports = { sendContactNotification };
