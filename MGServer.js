let email = require("emailjs/email");
let server = email.server.connect({
  user: "info@formforwarder.xyz",
  host: "smtp.mailgun.org",
  password: process.env.MG_PASS,
  ssl: true
});

module.exports = {
  sendEmail: (toEmail, bodyMsg) => {
    server.send(
      {
        text: bodyMsg,
        from: "Form Forwarder <info@formforwarder.xyz>",
        to: "<" + toEmail + ">",
        subject: "New Message | Form Forwarder",
        attachment: [
          {
            data: bodyMsg,
            alternative: true
          }
        ]
      },
      function(err, message) {
        if (err) {
          console.log(err);
        }
      }
    );
  }
};
