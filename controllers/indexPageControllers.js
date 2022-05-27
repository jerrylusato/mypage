const { getFileStream } = require('../s3')
const User = require('../models/user')

const get_dashboard = (req, res) => {
    let hostUrl = req.protocol + '://' + req.get('host')
    User
    .findById(req.params.id)
    .then(result => res.render('dashboard.ejs', 
    { user: result, hostUrl: hostUrl }))
    .catch(err => console.log(err))
}

const get_page = (req, res) => {
    User
    .findById(req.params.id)
    .then(result => res.render('page.ejs', { user: result }))
    .catch(err => console.log(err))
}

const get_avatar = (req, res) => {
    const key = req.params.key
    const readStream = getFileStream(key)
    readStream.pipe(res)
}

module.exports = {
    get_dashboard,
    get_page,
    get_avatar
}
