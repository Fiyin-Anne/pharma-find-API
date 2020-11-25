import fs from "fs";
import handlebars from "handlebars";
import "dotenv/config";

module.exports = {
  compileHtml: (templateName, replacements) => {
    const html = fs.readFileSync(
      `${__dirname}/../views/${templateName}.html`, "utf-8",
    );
    const template = handlebars.compile(html);

    const htmlToSend = template({ ...replacements });
    htmlToSend.replace("\\n", "");

    return htmlToSend;
  },

  emailVerificationLink: (token) => {
    const link = `${process.env.HOST_URL}/verify-email/${token}`;
    return link;
  }
};
