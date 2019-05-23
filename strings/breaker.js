const compose = (first, second) => (...args) => second(...args, first(...args))

// get current line
const getCurrentLineWithWord = (lines, word) =>
    lines.length ? `${lines[lines.length - 1]} ${word}` : null

// add word to current line or create new line
const addWordToCurrentLineOrCreateNewLine = charactersByLine => (lines, word, line) =>
    line && line.length <= charactersByLine
        ? (lines[lines.length - 1] = line) && lines
        : [...lines, word]

// a compose that get current line adding a word
// and then add word to current line or create new line
const addWordToLines = charactersByLine => (lines, word) =>
    compose(
        getCurrentLineWithWord,
        addWordToCurrentLineOrCreateNewLine(charactersByLine),
    )(lines, word)

// break words from paragraph and add each word into lines
const breakLines = ({charactersByLine}) => paragraph =>
    paragraph.split(' ')
        .reduce(addWordToLines(charactersByLine), [])
        // .map(line => justify ? justifyLine(line) : line)
        .join('\n')

// break paragraphs and call breakLines for each paragraphs
const breaker = ({text, charactersByLine = 40}) =>
    text.split('\n\n').map(breakLines({charactersByLine})).join('\n\n')

module.exports = breaker