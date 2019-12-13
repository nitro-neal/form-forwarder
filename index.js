const Joi = require("joi");
const express = require("express");
const path = require("path");
const EmailGenerator = require("./EmailGenerator");
const { sendEmail } = require("./MGServer");

const app = express();

// app.use(express.json());
app.use(express.urlencoded());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/:email", (req, res) => {
  const emailGenerator = new EmailGenerator();
  console.log(req.body);
  emailGenerator.addRows(req.body);

  const result = validateSendEmailReq(req.params.email);
  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error.details[0].message);
    return;
  }

  sendEmail(req.params.email, emailGenerator.getHtml());

  if (req.body._next !== undefined && req.body._next.length > 0) {
    res.redirect(req.body._next);
  } else {
    res.send("Your form has been submitted! Thank you! " + req.body);
  }
});

function validateSendEmailReq(email) {
  const schema = Joi.string().email();
  return Joi.validate(email, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
