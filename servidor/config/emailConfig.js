const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'medycalsystemproject@gmail.com',
    pass: 'tktq apkw dwgi qlsn'
  }
});

module.exports = transport;