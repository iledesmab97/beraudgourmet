const { transporter } = require('../mailer')
const { GOOGLE_USER } = process.env

module.exports = {
    emailVerification: async function ({token, user}) {
        const verificationLink = `http://localhost:3000/user-verify/${token}`
        transporter.sendMail({
            from: `"Verification email" <${GOOGLE_USER}>`, // sender address
            to: user.email, // list of receivers
            subject: "Verification email", // Subject line
            // text: "", // plain text body
            html: `<p>Te saludamos desde BeraudGourmet y te damos gracias por darnos la oportunidad de servirte con nuestras más exquisitas pizzas.</p><br/><a href='${verificationLink}'>Haz clic aquí para verificar tu cuenta.</a>`, // html body
        })
    }
}