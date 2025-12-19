import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpMail = async (toEmail, otp) => {

  const mailOptions = {
    from: `"Admin Panel" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your Login OTP",
    html: `
      <h2>Admin Login OTP</h2>
      <p>Your OTP is:</p>
      <h1 style="color: #4CAF50">${otp}</h1>
      <p>This OTP is valid for <b>2 days</b>.</p>
      <br/>
      <p>If you did not request this, please ignore.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
