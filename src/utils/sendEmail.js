import nodemailer from "nodemailer";
const sendEmail = async ({
  from = process.env.GMAIL,
  to,
  subject,
  html,
  attachments,
} = {}) => {
  const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASS,
    },
  });
  const info = await transporter.sendMail({
    from: `Care Bracelet" <${from}>`,
    to,
    subject,
    text: "dear user ..",
    html,
    attachments,
  });
  return info.accepted.length < 1 ? false : true;
};
export default sendEmail;
