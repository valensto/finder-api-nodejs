const nodemailer = require("nodemailer");

const sendValidationEmail = async (emailDestination, token) => {
  try {
    const config = {
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: process.env.MAILER_SSL === "true",
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PWD,
      },
    };
    const transporter = nodemailer.createTransport(config);
    let info = await transporter.sendMail({
      from: '"Finder Activation 👻" <v.e.brochard@gmail.com>',
      to: emailDestination,
      subject: "Activation de votre compte ✔",
      html: `
<a href="${process.env.BASE_URL}/api/auth/active-account?token=${token}">
    activez votre compte
</a>      
`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendValidationEmail,
};
