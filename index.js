const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false})); //parse app/x-www-form-unlencoded

app.use(bodyParser.json()); //parse app/json

let smtp_login = process.env.SMTP_LOGIN || '---'
let smtp_pass = process.env.SMTP_PASSWORD || '---'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_pass, // generated ethereal password
    },
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/sendMessage', async (req, res) => {

    //console.log('body', req.body);
    let {name, email, message} = req.body;

// send mail with defined transport object
    await transporter.sendMail({
        from: `HR WANTS ME`, // sender address
        to: "archiektor@gmail.com", // list of receivers
        subject: `HR ask`, // Subject line
        html: `<b>Message from your portfolio : </b>
        <div>from : ${name} ${email}</div>
        <div>${message}</div>`, // html body
    });

    res.send('all ok');
})

let port = process.env.PORT || 3010;

app.listen(port, () => {
    console.log('Example app is listening on port 3010');
})