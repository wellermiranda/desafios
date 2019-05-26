const reader = require('./reader')
const [,,subreddits, punctuation] = process.argv

reader(subreddits, punctuation || undefined)
    .then(x => console.log(x))
