import mailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

const { EMAIL_SENDER, EMAIL_SENDER_PASSWORD } = process.env;

const auth = {
  user: EMAIL_SENDER,
  pass: EMAIL_SENDER_PASSWORD,
};

const mail = mailer.createTransport({
  service: "Gmail",
  auth,
});

export const sendEmailHTML = (subject: string, to: string, html: string) => {
  const mailObject = <MailOptions>{
    from: auth.user,
    to,
    subject,
    html,
  };

  mail
    .sendMail(mailObject)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.error(err);
    });
};


export const sendEmailText = (subject: string, to: string, text: string) => {
  const mailObject = <MailOptions>{
    from: auth.user,
    to,
    subject,
    text,
  };

  mail
    .sendMail(mailObject)
    .then((result) => {
      console.log("[SUCCESS] Activation email is sent.");
    })
    .catch((err) => {
      console.error(err);
    });
};