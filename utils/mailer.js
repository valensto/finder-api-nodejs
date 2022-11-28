const nodemailer = require("nodemailer");

const sendValidationEmail = async (emailDestination) => {
  try {
    const config = {
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: false,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PWD,
      },
    };
    const transporter = nodemailer.createTransport(config);
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
