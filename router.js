const linksControllers = require('./controllers/linksControllers')
const userAuthControllers = require('./controllers/userAuthControllers')
const indexPageControllers = require('./controllers/indexPageControllers')
const router = require('express').Router()
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
const multer  = require('multer')

const upload = multer({ dest: 'uploads/' })
//auth
router.use(flash())
router.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())

router.get('/', (req, res) => res.redirect('/login'))

router.get('/login', userAuthControllers.checkNotAuthenticated, userAuthControllers.get_login)
router.get('/register', userAuthControllers.checkNotAuthenticated, userAuthControllers.get_register)
router.post('/login', userAuthControllers.login)
router.post('/register', upload.single('avatar'), userAuthControllers.register)
router.post('/logout', userAuthControllers.logout)

router.get('/dashboard/:id', userAuthControllers.checkAuthenticated, indexPageControllers.get_dashboard)

router.get('/image/:key', linksControllers.get_image)
router.get('/avatar/:key', indexPageControllers.get_avatar)

router.post('/:id/new-link', userAuthControllers.checkAuthenticated, upload.single('image'), linksControllers.add_link)
router.get('/:id/link/:linkId', userAuthControllers.checkAuthenticated, linksControllers.open_link)
router.get('/:id/delete/:linkId', userAuthControllers.checkAuthenticated, linksControllers.delete_link)

router.get('/:id', indexPageControllers.get_page)

// router.get('/*', (req, res) => res.redirect('/login'))

module.exports = router