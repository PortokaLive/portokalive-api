"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var _a = process.env, EMAIL_SENDER = _a.EMAIL_SENDER, EMAIL_SENDER_PASSWORD = _a.EMAIL_SENDER_PASSWORD;
var auth = {
    user: EMAIL_SENDER,
    pass: EMAIL_SENDER_PASSWORD,
};
var mail = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: auth,
});
exports.sendEmailHTML = function (subject, to, html) {
    var mailObject = {
        from: auth.user,
        to: to,
        subject: subject,
        html: html,
    };
    mail
        .sendMail(mailObject)
        .then(function (result) {
        console.log(result);
    })
        .catch(function (err) {
        console.error(err);
    });
};
exports.sendEmailText = function (subject, to, text) {
    var mailObject = {
        from: auth.user,
        to: to,
        subject: subject,
        text: text,
    };
    mail
        .sendMail(mailObject)
        .then(function (result) {
        console.log(result);
    })
        .catch(function (err) {
        console.error(err);
    });
};
//# sourceMappingURL=EmailService.js.map