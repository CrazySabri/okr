const express = require('express');
const router  = express.Router();
const bodyParser  = require('body-parser');
const Promise = require('promise');
const mailer = require('nodemailer');

router.use(bodyParser.json());

module.exports = function(app) {

    //Contact
    router.post('/contact', (req, res) => {
        const name = req.body.name
        const email = req.body.email
        const content = req.body.content

        sendmail(name, email, content)
        .then((response) => {
            res.send(response)
        })
        .catch((error) => {
            res.send({
                err: error
            })
        })
    })

    const sendmail = (name, email, content) => {
        return new Promise((resolve, reject) => {
            const message = {
                from: email,
                to: 'jerome.dups@gmail.com',
                subject: 'OKR dev',
                html: content.toString() + email.toString()
            }
            try{
                smtp.sendMail(message, function(error, info) {
                    resolve({
                        success: true
                    })
                });
            } catch(error) {
                console.log('sendmailでerrorになる')
                reject(error)
            }
        })
    }

    const smtp = mailer.createTransport({
        host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                  user: 'jerome.dups@gmail.com',
                  pass: '...'
              }
      });

  app.use(router)
}
