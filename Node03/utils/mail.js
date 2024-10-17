const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "nhnnhn1832004@gmail.com",
    pass: "asqz ojcb lfto bkbr",
  },
});

module.exports = async (to, subject, message) => {
    const info = await transporter.sendMail({
        from: '"Hoai Nam 👻" <nhnnhn1832004@gmail.com>', // sender address
        to:to, // list of receivers
        subject: subject, // Subject line
        html: message, // html body
      });
    return info;
}