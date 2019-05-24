const {compose} = require('./utils')

const justifyLine = ({line, charactersLeft}) => {
    let words = line.split(' ')
    const spaces = words.length - 1
    let factor = (charactersLeft - (charactersLeft % spaces)) / spaces
    let rest = charactersLeft % spaces
    const max = rest < 0 ? 1 : factor + 1
    const min = rest < 0 ? 0 : factor
    let left = rest < 0 ? charactersLeft : rest
    let lastMin = -1

    for (let i = 0; i < words.length - 1; i++) {
        const isEven = i % 2 === 0
        const hasLeft = left > 0
        let add = isEven && hasLeft ? max : min
        lastMin = add === min ? i : lastMin
        words[i] += Array(add).fill(' ').join('')
        left -= isEven && add === max ? 1 : 0
    }

    if(left && lastMin !== -1) words[lastMin] += ' '

    return words.join(' ')
}

const justifier = ({charactersByLine, line}) =>
    compose(
        () => charactersByLine - line.length,
        charactersLeft => charactersLeft ? justifyLine({line, charactersLeft}) : line
    )()

module.exports = justifier