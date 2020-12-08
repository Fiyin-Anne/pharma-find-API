import "dotenv/config";

module.exports = {
  emailVerificationLink: (token) => {
    const link = `${process.env.HOST_URL}/verify-email/${token}`;
    return link;
  },
  forgetPasswordLink: (id, token) => {
    const link = `${process.env.HOST_URL}/reset/${id}-${token}`;
    return link;
  },
};
