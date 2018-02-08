const functions = require('firebase-functions')
const nodemailer = require('nodemailer')


exports.helloWorld = functions.https.onRequest((request, response) => {
    let emailAddresses = request.body.split('-')[0]
    let code = request.body.split('-')[1]
    const gmailEmail = functions.config().gmail.email
    const gmailPassword = functions.config().gmail.password
    console.log("emails", emailAddresses)
    console.log("code", code)

    const mailTransport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: gmailEmail,
            pass: gmailPassword
        }
    });

    let mailOptions = {
        from: '"Squawk" <ghsquawk@gmail.com>', // sender address
        to: emailAddresses, // list of receivers
        subject: 'Squawk Invitiation', // Subject line
        text: `You've been invited to Squawk. Head to https://squawk-868c7.firebaseapp.com/, sign in, and enter the code ${code} to join a game!`, // plain text body
    }
    return mailTransport.sendMail(mailOptions)
        .then(() => response.send("IT WORKED"))
        .catch(error => console.error('There was an error while sending the email:', error));

})
