const reader = require('./reader')
const [,,subreddits, punctuation] = process.argv

reader(subreddits, (punctuation && parseInt(punctuation)) || undefined)
    .then(x => console.log(x))
