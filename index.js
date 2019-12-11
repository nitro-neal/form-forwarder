const Joi = require("joi");
const express = require("express");
const path = require("path");
const EmailGenerator = require("./EmailGenerator");
const { sendEmail } = require("./MGServer");

const app = express();
const emailGenerator = new EmailGenerator();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Send Email Homepage");
// });

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/api/send-email/:email", (req, res) => {
  emailGenerator.addRows(req.body);

  const result = validateSendEmailReq(req.params.email);
  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error.details[0].message);
    return;
  }

  sendEmail(req.params.email, emailGenerator.getHtml());
  res.send(req.body);
});

function validateSendEmailReq(email) {
  const schema = Joi.string().email();
  return Joi.validate(email, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
