const initializePassport = require('../passport-config')
const User = require('../models/user')
const { uploadFile } = require('../s3')
const passport = require('passport')
const util = require('util')
const fs = require('fs')

initializePassport(
    passport,
    email => User.findOne({ email: email }),
    id => User.findById(id)
)

const get_login = (req, res) => res.render('login.ejs')

const get_register = (req, res) => res.render('register.ejs')

const login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
})

const logout = (req, res) => {
    req.logOut()
    res.redirect('/login')
}

const register = async (req, res) => {
    const { name, email, password } = req.body
    const registered = await User.findOne({ email: email })
    if (registered) {
        res.redirect('/login')
    } else {
        try {
            const avatarObj = await uploadFile(req.file)
            const unlinkFile = util.promisify(fs.unlink)
            await unlinkFile(req.file.path)
            const user = new User({
                'name': name,
                'avatar': avatarObj.Key,
                'email': email,
                'password': password,
                'views': 0,
                'links': []
            })
            user
                .save()
                .then(result => res.redirect('/login'))
        } catch (err) {
            console.log(err)
            res.redirect('/register')
        }
    }
}

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard/' + req.user.id)
    }
    next()
}

module.exports = {
    login,
    logout,
    register,
    get_login,
    get_register,
    checkAuthenticated,
    checkNotAuthenticated
}
