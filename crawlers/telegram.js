const bot = require("botgram")(process.env.BOT_TOKEN)

bot.command("NadaPraFazer", async (msg, reply) => {
    let [subreddits, punctuation] = msg.args(2)
    punctuation = (punctuation && parseInt(punctuation)) || undefined
    return reply.text(`Procurando por "${subreddits}"${punctuation ? ` com pontuação "${punctuation}"`: ''}`)
})

bot.command((msg, reply) =>
    reply.text("Comando inválido."))