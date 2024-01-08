require('dotenv').config({ path: '.env.local'})
const nodemailer = require('nodemailer')

const { GOOGLE_USER, GOOGLE_KEY_APP } = process.env

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: GOOGLE_USER,
      pass: GOOGLE_KEY_APP,
    },
  });

transporter.verify().then( () => {
    console.log('Ready for send emails')
})

module.exports = { transporter }