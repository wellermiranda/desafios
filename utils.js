const compose = (first, second) => (...args) => second(...args, first(...args))
const flat = matrix => matrix.reduce((p, c) => [...p, ...c], [])
const toInt = x => Number.isInteger(parseInt(x)) ? parseInt(x) : 0

module.exports = {compose, flat, toInt}