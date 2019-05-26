const Telegraf = require("telegraf")
const reader = require("../crawlers/reader")
const {herokuPortFix} = require("../utils")

herokuPortFix()

const bot = new Telegraf(process.env.BOT_TOKEN)

const toHtml = ({threadLink, title, subreddit, upvotes, threadCommentsLink}) =>
    `<a href="${threadLink}">${title}</a>\nSubreddit: ${subreddit} | Votos: ${upvotes} | <a href="${threadCommentsLink}">Comentários</a>\n`

bot.command('NadaPraFazer', async ({reply, telegram, deleteMessage, update: {message}}) => {
    let loading = null

    try {
        const {text, chat: {id: chatId}} = message
        let [, subreddits, punctuation] = text.split(' ')
        punctuation = (punctuation && parseInt(punctuation)) || undefined

        loading = (await reply(`Buscando...`)).message_id
        const threads = (await reader(subreddits, punctuation))

        const html = threads && threads.length
            ? `${threads.reduce((p, c) => `${p}\n${toHtml(c)}`, '')}`
            : `Ops, não encontrei nada relevante sobre <strong>${subreddits}</strong>.`

        return telegram.sendMessage(chatId, html, {parse_mode: 'HTML', disable_web_page_preview: true})
    } catch (e) {
        console.error('ERROR =>', e)
        return reply(`Ops, ocorreu um erro durante a busca.`)
    } finally {
        loading && await deleteMessage(loading)
    }
})

bot.launch()