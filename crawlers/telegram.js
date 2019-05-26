const Telegraf = require("telegraf")
const reader = require("../crawlers/reader")
const {herokuPortFix} = require("../utils")

herokuPortFix()

const bot = new Telegraf(process.env.BOT_TOKEN)

const toHtml = ({threadLink, title, subreddit, upvotes, threadCommentsLink}) =>
    `<a href="${threadLink}">${title}</a>\nSubreddit: ${subreddit} | Votes: ${upvotes} | <a href="${threadCommentsLink}">Comments</a>\n`

bot.command('NadaPraFazer', async ({replyWithHTML, update: { message: {text} }}) => {
    let [,subreddits, punctuation] = text.split(' ')
    punctuation = (punctuation && parseInt(punctuation)) || undefined
    const threads = (await reader(subreddits, punctuation)).map(toHtml)
    return threads.map(html => replyWithHTML(html))
})

bot.launch()