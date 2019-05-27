const {compose} = require('../utils')
const justifier = require('./justifier')

const getCurrentLineWithWord = (lines, word) =>
    lines.length ? `${lines[lines.length - 1]} ${word}` : null

const addWordToCurrentLineOrCreateNewLine = charactersByLine => (lines, word, line) =>
    line && line.length <= charactersByLine
        ? (lines[lines.length - 1] = line) && lines
        : [...lines, word]

// a compose that get current line concatenating current word
// and then change current line or create new line with current word
const addWordIntoLine = charactersByLine => (lines, word) =>
    compose(
        getCurrentLineWithWord,
        addWordToCurrentLineOrCreateNewLine(charactersByLine),
    )(lines, word)

// call method to justify line when it is necessary
const justifyLineOrKeep = ({justify, charactersByLine}) => line =>
    justify ? justifier({charactersByLine, line}) : line

// break words from paragraph and add each word into a line
const adjustParagraphLines = ({charactersByLine, justify}) => paragraph =>
    paragraph.split(' ')
        .reduce(addWordIntoLine(charactersByLine), [])
        .map(justifyLineOrKeep({justify, charactersByLine}))
        .join('\n')

// break paragraphs and call a method to adjust lines for each paragraph
const breaker = ({text, charactersByLine = 40, justify = false}) =>
    text.split('\n\n').map(adjustParagraphLines({charactersByLine, justify})).join('\n\n')

module.exports = breaker