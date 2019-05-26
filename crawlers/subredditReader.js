const {get} = require('./http')
const threadsReader = require('./threadsReader')

const subredditReader = async (url, punctuation = 5000) => {
    const html = await get(`${url}${(url.match(/\?/g) ? '&' : '?')}sort=top&t=day`)
    const {items, next} = await threadsReader(html)
    return [
        ...items.filter(({upvotes, downvotes}) => upvotes - downvotes >= punctuation),
        ...(next ? await subredditReader(next) : [])
    ]
}

module.exports = subredditReader
