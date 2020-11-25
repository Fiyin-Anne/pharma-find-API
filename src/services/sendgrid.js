import dotenv from "dotenv";

const sgMail = require("@sendgrid/mail");

dotenv.config();

module.exports = async ({
  to, from, subject, html
}) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({
      to, from, subject, html,
    });
  } catch (error) {
    return error;
  }
  return { message: "Email sent" };
};
