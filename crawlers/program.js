const reader = require('./reader')
const [,,subreddits] = process.argv

reader(subreddits)
    .then(x => console.log(x))
