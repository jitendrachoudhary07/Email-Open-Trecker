import { createTransport } from "nodemailer";

const transport = createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendMail = async (emails: string[], trackingId: string) => {
  const trackingURL = `${Bun.env.BASE_URL}/track/track-mail/${trackingId}`;
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: emails,
    subject: "Tracking dead pixel ID",
    html: `
            <h1>Tracking ID: ${trackingId}</h1>
            <img src="${trackingURL}" alt="dead pixel" style="width: 1px; height: 1px; display: none;" />
        `,
  };

  try {
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send mail");
  }
};
