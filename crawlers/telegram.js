const bot = require("botgram")(process.env.BOT_TOKEN)
const reader = require('./reader')

console.log('BOT STARTED')

const template = `<a href="%s">%s</a>\nSubreddit: %s | Votes: %s | <a href="%s">Comments</a>\n`
const toParams = ({threadLink, title, subreddit, upvotes, threadCommentsLink}) =>
    [threadLink, title, subreddit, upvotes, threadCommentsLink]

bot.command("NadaPraFazer", async (msg, reply) => {
    let [subreddits, punctuation] = msg.args(2)
    punctuation = (punctuation && parseInt(punctuation)) || undefined
    const threads = (await reader(subreddits, punctuation)).map(toParams)
    return threads.map(params => reply.html(template, ...params))
})

bot.command((msg, reply) =>
    reply.text("Comando inválido."))