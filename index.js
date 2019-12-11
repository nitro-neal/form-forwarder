const Joi = require("joi");
const express = require("express");
const app = express();

// let EmailGenerator = require("./EmailGenerator");
// let emailGenerator = new EmailGenerator();

var email = require("emailjs/email");
var server = email.server.connect({
  user: "info@formforwarder.xyz",
  host: "smtp.mailgun.org",
  ssl: true
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Send Email Homepage");
});

let bodyMsg = `
<h1 style="text-align: center; color: #2a878f;"><span style="color: #2a878f;">Form Forwarder</span><span style="color: #000000; font-size: 14px;">&nbsp;</span></h1>
<p>&nbsp;</p>
<h2 style="text-align: center; color: #2a878f;">You have a new message from form forwarder:</h2>
<table style="padding: 30px; width: 500px; margin-left: auto; margin-right: auto;">
<tbody>
TABLE_ROWS
</tbody>
</table>
<p>&nbsp;</p>
<p style="text-align: center; color: #2a878f;"><strong>This was sent to you from </strong><a href="formforwarder.xyz"><strong>Form Forwarder</strong></a></p>`;

app.put("/api/send-email/:email", (req, res) => {
  //   emailGenerator.addRows(req.body);
  let tableRows = "";
  for (let [key, value] of Object.entries(req.body)) {
    tableRows += `
      <tr>
      <td><strong>${key}</strong></td>
      <td>${value}</td>
      </tr>`;
  }

  bodyMsg = bodyMsg.replace("TABLE_ROWS", tableRows);

  console.log(bodyMsg);

  server.send(
    {
      text: bodyMsg,
      from: "Form Forwarder <info@formforwarder.xyz>",
      to: "<" + req.params.email + ">",
      subject: "New Message | Form Forwarder",
      attachment: [
        {
          data: bodyMsg,
          alternative: true
        }
      ]
    },
    function(err, message) {
      console.log(err || message);
    }
  );

  res.send(req.body);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
