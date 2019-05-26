const axios = require('axios')

const buildParams = params => Object.entries(params)
    .map(([prop, value]) => `${prop}=${value}`).join('&')

const get = (url, params = {}) =>
    axios.get(`${url}?${buildParams(params)}`).then(({data}) => data)

module.exports = {get}
