const {compose} = require('./utils')

const justifyLine = ({line, charactersLeft}) => {
    let words = line.split(' ')
    const spaces = words.length - 1
    let rest = charactersLeft - spaces
    const max = rest < 0 ? 1 : 2
    const min = rest < 0 ? 0 : 1
    let left = rest < 0 ? charactersLeft : rest

    for (let i = 0; i < words.length - 1; i++) {
        const isEven = i % 2 === 0
        const isLastSpace = i === (words.length - 2)
        const hasLeft = left > 0
        let add = isEven && hasLeft ? max : min
        add += isLastSpace && hasLeft && add !== max ? 1 : 0
        words[i] += Array(add).fill(' ').join('')
        left -= isEven ? 1 : 0
    }

    return words.join(' ')
}

const justifier = ({charactersByLine, line}) =>
    compose(
        () => charactersByLine - line.length,
        charactersLeft => charactersLeft ? justifyLine({line, charactersLeft}) : line
    )()

module.exports = justifier