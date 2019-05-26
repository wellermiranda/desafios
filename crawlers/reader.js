const subredditReader = require('./subredditReader')
const {flat} = require('../utils')

const separator = ';'
const getUrl = subreddit => `https://old.reddit.com/r/${subreddit}/top/`

const getEachSubredditThreads = punctuation => async subreddit =>
    (await subredditReader(getUrl(subreddit), punctuation))
        .map(thread => ({...thread, subreddit}))

const reader = async (subreddits, punctuation) => flat(await Promise.all(subreddits.split(separator)
    .map(getEachSubredditThreads(punctuation))))

module.exports = reader