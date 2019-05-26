const Telegraf = require("telegraf")
const reader = require("../crawlers/reader")
const {herokuPortFix} = require("../utils")

herokuPortFix()

const bot = new Telegraf(process.env.BOT_TOKEN)

const toHtml = ({threadLink, title, subreddit, upvotes, threadCommentsLink}) =>
    `<a href="${threadLink}">${title}</a>\nSubreddit: ${subreddit} | Votes: ${upvotes} | <a href="${threadCommentsLink}">Comments</a>\n`

bot.command('NadaPraFazer', async ({replyWithHTML, update: { message: {text} }}) => {
    try {
        let [, subreddits, punctuation] = text.split(' ')
        punctuation = (punctuation && parseInt(punctuation)) || undefined
        const threads = (await reader(subreddits, punctuation)).map(toHtml)
        return threads && threads.length
            ? threads.map(html => replyWithHTML(html))
            : replyWithHTML(`Ops, não encontrei nada relevante sobre <strong>${subreddits}</strong>.`)
    } catch(e) {
        return replyWithHTML(`Ops, ocorreu um erro durante a busca.`)
    }
})

bot.launch()