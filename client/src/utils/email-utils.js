import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "microsounds01@gmail.com",
    pass: "Lamine12!",
  },
});

export const sendEmail = (emailContent) => {
  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(emailContent, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};