const User = require('../models/User')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

process.env.SECRET_KEY = 'secret'


exports.login = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
        .then(user => {
            if (user) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.json({ token: token })
            } else {
                res.send('User with entered credentials does not exist.')
            }
        })
        .catch(err => {
            res.send('error: ' + err);
        });
};

exports.resetPassword = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (user) {
                // generate password - works
                var randomstring = Math.random().toString(36).slice(-8);
                console.log(randomstring)

                // set new password password - works
                req.body.password = randomstring;

                // update password in database
                updatePassword(req, res);

                // send email - works - but  there is a text welcome to our site
                const hiddenEmailOutput = req.body.email.substring(0, 2) + '*****@tztech.com';
                const output = `
                    <h3>TzTech account</h3>
                    <h1>Password reset code</h1>
                    <br>
                    <p>Please use this code to reset the password for TzTech account</p>
                    <p><a>${ hiddenEmailOutput }</a></p>
                    <p>Here is your code: <b>${ req.body.password }</b></p>
                    <p><b>Note: </b> If <a>${ hiddenEmailOutput }</a> is your account but you did not reset your password, do not worry - you are safe!</p>
                    <p>At next sign in please use new password we sent you in this email.</p>
                    <br>
                    <p>If you dont recognize the TzTech account <a>${ hiddenEmailOutput }</a>, please ignore this email.</p>
                    <p>Thanks,</p>
                    <p>The TzTech account team</p>`;
                    let mailOptions = {
                        from: '"Nodemailer Contact" ',
                        to: req.body.email,
                        subject: 'Your login details',
                        text: "Your login informations",
                        html: output
                    };

                sendMail(req, res, mailOptions);

            } else {
                console.log("Someone tried to reset non-existing password.")
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}


updatePassword = (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;

    let qry = "UPDATE `users` SET `password` = '" + pass + "' WHERE `users`.`email` = '" + email + "'";

    db.query(qry, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
}

exports.register = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                createUser(req, res)
            } else {
                res.json('User with this email already exists.')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

createUser = (req, res) => {
    const today = new Date()
    const userData = {
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profileImage: req.body.profileImage,
        roleId: req.body.roleId,
        created: today
    }
    User.create(userData)
        .then(user => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
            })

            const output = `
                <p> Thank you for registering on TzTech website</p>
                <p>Your Password is:<b> ${req.body.password}</b></p>

                <p>Please contact as for any information.</p>
                <p>Thanks,</p>
                <p>The TzTech account team</p>`;
            let mailOptions = {
                from: '"Nodemailer Contact" ',
                to: req.body.email,
                subject: 'Your login details',
                text: "Your login informations",
                html: output
            };

            sendMail(req, res, mailOptions)
            res.json({ token: token })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
}

sendMail = (req, res, mailOptions) => {
    //create reusable transporter object using the default SMTP transport
    let transport = nodemailer.createTransport({
        host: 'smtp.live.com',
        port: 587,
        secure: false, //true for 465, false for other ports
        auth: {
            user: '',
            pass: ''
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('contact', { msg: 'Email has been sent!' });
    });
}

exports.emails = (req, res) => {
    let qry = "SELECT `email` FROM `users`";

    db.query(qry, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(result);
    });
}

    exports.address = (req, res) => {
     let id = req.params.id;
     //console.log(id);
      //let query = "SELECT address_id FROM `address` JOIN `users` ON address.id = users.address_id WHERE users.id = 1"
      //let query = "SELECT address_id FROM `users` JOIN `address` ON users.address_id = address.id WHERE users.id = 1 ";
      let query = "SELECT * FROM `users` JOIN `address` ON users.address_id = address.id WHERE users.id = 1";
      console.log(query);
      db.query(query, (err, result) => {
              console.log(result);
        if(err) {
          return res.status(500).send(err);
        }
        return res.status(200).send(result);
      });
    }
