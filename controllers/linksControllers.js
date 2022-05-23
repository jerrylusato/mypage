const User = require('../models/user')

const add_link = (req, res) => {
    console.log('req received')
    console.log(req.body)
    const userId = req.params.id
    const { title, url } = req.body
    const link = {
        'title': title,
        'link-pic': "",
        'url': url,
        'views': 0,
        'clicks': 0
    }
    console.log(link)
    User
    .findById(userId)
    .then( async user => {
        const links = user.links
        links.push(link)
        console.log('link added and ...')
        await User.findByIdAndUpdate(userId, { links: links })
        console.log('saved')
    })
    .then(user => res.redirect('/dashboard/' + userId))
    .catch(err => console.log(err))
}

const open_link = (req, res) => {
    console.log('req received')
    console.log(req.params)
    let reqLinks = ""
    const userId = req.params.id
    const linkId = req.params.linkId
    console.log('trying to open')
    User
    .findById(userId)
    .then(user => {
        const links = user.links
        console.log(links)
        reqLinks = links.filter(val => val._id == linkId)
        console.log('links found:')
        console.log(reqLinks)
    })
    .then(() => res.redirect(reqLinks[0].url))
    .catch(err => console.log(err))
}

const delete_link = (req, res) => {
    console.log('req received')
    console.log(req.params)
    let newLinks = ""
    const userId = req.params.id
    const linkId = req.params.linkId
    console.log('trying to delete')
    User
    .findById(userId)
    .then(async user => {
        const links = user.links
        newLinks = links.filter(val => {
            return !(val._id == linkId)
        })
        console.log('new links:')
        console.log(newLinks)
        await User.findByIdAndUpdate(userId, { links: newLinks })
        console.log('Saved')
    })
    .then(() => res.redirect('/dashboard/' + userId))
    .catch(err => console.log(err))
}

module.exports = {
    add_link,
    open_link,
    delete_link
}
