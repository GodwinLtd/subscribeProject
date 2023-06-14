const nodeMailer = require("nodemailer");

const sendMail = (mailOptions, res, onSuccess) => {
  const transporter = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error:", error.message);
      return res
        .status(500)
        .send("Having issues sending mail...please try again later");
    } else {
      console.log(`Email sent: ${info.response}`);
      return res.status(200).send("Mail sent successfully");
    }

    onSuccess();
  });
};

module.exports = sendMail;
