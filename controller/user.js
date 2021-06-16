const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createNewUser = (req, res, next) => {

    console.log(req.body);
    bcrypt.hash(req.body.password, 10).then(hash => {

        const user = new User({
            email: req.body.email,
            password: hash
        });

        user.save().then(result => {

            res.status(201).json({
                message: 'user create successfully',
                result: result
            });

        }).catch(err => {

            res.status(500).json({
                error: err
            });
        })
    })

}

exports.loin = (req, res, next) => {
    let fetchedUser;
    console.log(req.body);
    User.findOne({ email: req.body.email }).then(user => {
        console.log(user);
        if (!user) {
            return res.status(401).json({
                message: 'auth failed'
            })
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if (!result) {
            return res.status(401).json({
                message: 'auth failed'
            });
        }
        const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, process.env.SECRET_KEY, {
            expiresIn: "1hr",
        });
        res.status(200).json({
            token: token,
            expiresIn: 3600
        })

    }).catch(e => {
        res.status(401).json({
            message: 'auth failed'
        });
    })
}