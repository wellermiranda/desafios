const subredditReader = require('./subredditReader')
const {flat} = require('../utils')

const separator = ';'
const getUrl = subreddit => `https://old.reddit.com/r/${subreddit}/top/`

const getEachSubredditThreads = async subreddit =>
    (await subredditReader(getUrl(subreddit)))
        .map(thread => ({...thread, subreddit}))

const reader = async subreddits => flat(await Promise.all(subreddits.split(separator)
    .map(getEachSubredditThreads)))
module.exports = reader