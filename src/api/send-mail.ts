import { Hono } from "hono";
import { v4 as uuid } from "uuid";
import Track from "../model/track.model";
import { sendMail } from "../utils/sendMail";
const app = new Hono();

app.post("/send-mail", async (c) => {
  const { emails, password } = await c.req.json();

  //checks
  if (!emails || !password)
    return c.json({ error: "Emails and password are required" });

  //password check
  if (password !== Bun.env.PASSWORD) return c.json({ error: "Wrong Password" });

  //tracking id , data store => DB
  const trackingId = uuid();

  try {
    await Track.create({ trackingId });
    await sendMail(emails, trackingId);

    return c.json({
      trackingId: trackingId,
      message: "Email sent successfully",
    });
    //mail sending -----
  } catch (error) {
    console.log(error);
    return c.json({ error: "Failed to send email" });
  }

  //send mail
});

export default app;
