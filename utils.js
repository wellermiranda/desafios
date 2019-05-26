const compose = (first, second) => (...args) => second(...args, first(...args))
const flat = matrix => matrix.reduce((p, c) => [...p, ...c], [])
const toInt = x => Number.isInteger(parseInt(x)) ? parseInt(x) : 0
const limit = n => (x, i) => i < n
const threadLink = url => url.match(/(http(s?)\:\/\/)/g) ? url : `https://old.reddit.com/r/${url}`

// It's just a workaround to keep heroku running the bot
const herokuPortFix = () => {
    const express = require('express')
    const app = express()
    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`Listening on port ${port}`))
}

module.exports = {compose, flat, toInt, limit, threadLink, herokuPortFix}