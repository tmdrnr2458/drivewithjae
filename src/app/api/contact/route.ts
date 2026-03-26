import { NextResponse } from "next/server";

// Using Web3Forms free API — no signup needed for basic usage
// For production: set WEB3FORMS_KEY in env, or switch to Resend/SendGrid
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, language, message, appointment, vehicle, vin, formType } = body;

    // Build email content
    const subject = formType === "trade-in"
      ? `Trade-In Request from ${name}`
      : vehicle
        ? `Inquiry about ${vehicle} from ${name}`
        : `New Contact from ${name}`;

    let emailBody = `
Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
Preferred Language: ${language || "English"}
${appointment ? "⭐ Wants to schedule a visit\n" : ""}
${vehicle ? `Vehicle Interest: ${vehicle}\n` : ""}
${vin ? `VIN: ${vin}\n` : ""}
Message:
${message || "No message"}
    `.trim();

    // If trade-in, add vehicle details
    if (formType === "trade-in") {
      const { tradeYear, tradeMake, tradeModel, tradeMileage, tradeVin, condition, notes } = body;
      emailBody = `
TRADE-IN REQUEST

Customer:
  Name: ${name}
  Phone: ${phone}
  Email: ${email || "Not provided"}

Vehicle to Trade:
  Year: ${tradeYear}
  Make: ${tradeMake}
  Model: ${tradeModel}
  Mileage: ${tradeMileage}
  VIN: ${tradeVin || "Not provided"}
  Condition: ${condition}

Notes: ${notes || "None"}
      `.trim();
    }

    // Option 1: Web3Forms (free, works immediately)
    if (process.env.WEB3FORMS_KEY) {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_KEY,
          subject,
          from_name: "Drive with Jae",
          to: "sjae@anderson-auto.net",
          message: emailBody,
          replyto: email || phone,
        }),
      });
      if (!res.ok) throw new Error("Web3Forms failed");
    }

    // Option 2: Resend (if configured)
    else if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Drive with Jae <noreply@drivewithjae.com>",
          to: "sjae@anderson-auto.net",
          subject,
          text: emailBody,
          reply_to: email || undefined,
        }),
      });
      if (!res.ok) throw new Error("Resend failed");
    }

    // Fallback: just log (dev mode)
    else {
      console.log("=== NEW FORM SUBMISSION ===");
      console.log("Subject:", subject);
      console.log(emailBody);
      console.log("=== END ===");
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send" },
      { status: 500 }
    );
  }
}
