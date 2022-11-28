const nodemailer = require("nodemailer");

const sendValidationEmail = async (emailDestination) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PWD,
      },
    });
    let info = await transporter.sendMail({
      from: '"Finder 👻" <v.e.brochard@gmail.com>',
      to: emailDestination,
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendValidationEmail,
};
