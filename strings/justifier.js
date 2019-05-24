const {compose} = require('./utils')

const getVariables = ({line, charactersLeft}) => {
    let words = line.split(' ')
    const spaces = words.length - 1
    let rest = charactersLeft % spaces
    const factor = (charactersLeft - (charactersLeft % spaces)) / spaces

    return {
        words,
        lastMin: -1,
        ...(rest < 0
            ? {max: 1, min: 0, left: charactersLeft}
            : {max: factor + 1, min: factor, left: rest})
    }
}

const justify = ({line, charactersLeft}) => {
    let {words, left, max, min, lastMin} = getVariables({line, charactersLeft})

    for (let i = 0; i < words.length - 1; i++) {
        const isEven = i % 2 === 0
        const add = isEven && left ? max : min

        words[i] += Array(add).fill(' ').join('')

        if (add === min) lastMin = i
        else if (isEven) left -= 1
    }

    if (left && lastMin !== -1) words[lastMin] += ' '

    return words.join(' ')
}

const justifier = ({charactersByLine, line}) =>
    compose(
        () => charactersByLine - line.length,
        charactersLeft => charactersLeft ? justify({line, charactersLeft}) : line
    )()

module.exports = justifier