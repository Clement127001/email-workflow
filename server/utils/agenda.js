const { Agenda } = require("@hokify/agenda");
const nodemailer = require("nodemailer");

const agenda = new Agenda({ db: { address: process.env.MONGO_URI } });

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

agenda.define("send-email", async (job) => {
  const { to, subject, html } = job.attrs.data;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    from: "maddison53@ethereal.email",
    to,
    subject,
    html,
  });
});

(async function () {
  await agenda.start();
})();

module.exports = agenda;
