const {get} = require('./http')
const threadsReader = require('./threadsReader')
const PUNCTUATION = 5000

const subredditReader = async url => {
    const html = await get(`${url}${(url.match(/\?/g) ? '&' : '?')}sort=top&t=day`)
    const {items, next} = await threadsReader(html)
    return [
        ...items.filter(({upvotes, downvotes}) => upvotes - downvotes >= PUNCTUATION),
        ...(next ? await subredditReader(next) : [])
    ]
}

module.exports = subredditReader
