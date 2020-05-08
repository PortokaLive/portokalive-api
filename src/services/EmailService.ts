import mailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

const auth = {
  user: "techlestial@gmail.com",
  pass: "Yevn140295",
};

const mail = mailer.createTransport({
  service: "Gmail",
  auth,
});

export const sendEmail = (subject: string, to: string, text: string) => {
  const mailObject = <MailOptions>{
    from: auth.user,
    to,
    subject,
    text,
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
