const fileupload = require('express-fileupload');

const express = require("express");
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const port = process.env.PORT || "8000";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(fileupload());

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: 'brzden32@gmail.com',
    pass: 'hs32dFD32'
  }
});

app.post("/sendmail", (req, res) => {
  var data = req.body
  var mailOptions = {
    from: data.email,
    to: 'andreipedrov@yandex.com',
    subject: data.name,
    text: data.text,
    phone: data.phone
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.write('could not access' + error);
      res.end();
    } else {
      res.write('success');
      res.end();
    }
  });
})

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});