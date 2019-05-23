const compose = (first, second) => (...args) => second(...args, first(...args))
module.exports = {compose}