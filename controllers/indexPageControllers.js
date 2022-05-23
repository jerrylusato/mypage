const User = require('../models/user')

const get_dashboard = (req, res) => {
    let hostUrl = req.protocol + '://' + req.get('host')
    User
    .findById(req.params.id)
    .then(result => res.render('dashboard.ejs', 
    { user: result, hostUrl: hostUrl }))
    .catch(err => console.log(err))
}

const get_index = (req, res) => {
    User
    .findById(req.params.id)
    .then(result => res.render('index.ejs', { user: result }))
    .catch(err => console.log(err))
}

module.exports = {
    get_dashboard,
    get_index
}
