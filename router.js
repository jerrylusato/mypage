const linksControllers = require('./controllers/linksControllers')
const userAuthControllers = require('./controllers/userAuthControllers')
const indexPageControllers = require('./controllers/indexPageControllers')
const router = require('express').Router()
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')

//auth
router.use(flash())
router.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())
//end

router.get('/', (req, res) => res.redirect('/login'))

router.get('/login', userAuthControllers.checkNotAuthenticated, userAuthControllers.get_login)
router.get('/register', userAuthControllers.checkNotAuthenticated, userAuthControllers.get_register)
router.post('/login', userAuthControllers.login)
router.post('/register', userAuthControllers.register)
router.post('/logout', userAuthControllers.logout)

router.get('/dashboard/:id', userAuthControllers.checkAuthenticated, indexPageControllers.get_dashboard)

router.post('/:id/new-link', userAuthControllers.checkAuthenticated, linksControllers.add_link)
router.get('/:id/link/:linkId', userAuthControllers.checkAuthenticated, linksControllers.open_link)
router.get('/:id/delete/:linkId', userAuthControllers.checkAuthenticated, linksControllers.delete_link)

router.get('/:id', indexPageControllers.get_index)

// router.get('/*', (req, res) => res.redirect('/login'))

module.exports = router