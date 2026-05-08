import nodemailer from "nodemailer";

const sendEmailNotification = async (userEmail, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // ያንተ ኢሜይል
      pass: process.env.EMAIL_PASS, // የ Gmail App Password (ተራ ፓስወርድ አይደለም)
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.log("Email Error:", error);
  }
};
