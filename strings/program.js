const [,,charactersByLine, justify] = process.argv
const breaker = require('./breaker')

const result = breaker({
    text: `In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.

And God said, "Let there be light," and there was light. God saw that the light was good, and he separated the light from the darkness. God called the light "day," and the darkness he called "night." And there was evening, and there was morning - the first day.`,
    charactersByLine: parseInt(charactersByLine) || 40,
    justify: Boolean(justify) || false
})

console.log(result)
