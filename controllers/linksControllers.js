const User = require('../models/user')
const { uploadFile, getFileStream } = require('../s3')
const util = require('util')
const fs = require('fs')

const add_link = async (req, res) => {
    const userId = req.params.id
    const { title, url } = req.body
    const imageObj = await uploadFile(req.file)
    const unlinkFile = util.promisify(fs.unlink)
    await unlinkFile(req.file.path)
    const link = {
        'title': title,
        'image': imageObj.Key,
        'url': url,
        'views': 0,
        'clicks': 0
    }
    User
    .findById(userId)
    .then( async user => {
        const links = user.links
        links.push(link)
        await User.findByIdAndUpdate(userId, { links: links })
    })
    .then(user => res.redirect('/dashboard/' + userId))
    .catch(err => console.log(err))
}

const get_image = (req, res) => {
    const key = req.params.key
    const readStream = getFileStream(key)
    readStream.pipe(res)
}

const open_link = (req, res) => {
    let reqLinks = ""
    const userId = req.params.id
    const linkId = req.params.linkId
    User
    .findById(userId)
    .then(user => {
        const links = user.links
        reqLinks = links.filter(val => val._id == linkId)
    })
    .then(() => res.redirect(reqLinks[0].url))
    .catch(err => console.log(err))
}

const delete_link = (req, res) => {
    let newLinks = ""
    const userId = req.params.id
    const linkId = req.params.linkId
    User
    .findById(userId)
    .then(async user => {
        const links = user.links
        newLinks = links.filter(val => !(val._id == linkId))
        await User.findByIdAndUpdate(userId, { links: newLinks })
    })
    .then(() => res.redirect('/dashboard/' + userId))
    .catch(err => console.log(err))
}

module.exports = {
    add_link,
    get_image,
    open_link,
    delete_link
}
