import nodemailer from 'nodemailer';

const Mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASS,
  },
});

export default Mailer;
