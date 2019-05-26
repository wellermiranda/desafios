const {scrapeHTML} = require('scrape-it')
const {toInt} = require('../utils')

const options = {
    items: {
        listItem: "div.thing:not(.promoted)",
        data: {
            upvotes: {
                selector: "div.score.unvoted",
                attr: 'title',
                convert: toInt
            },
            title: {
                selector: "a.title",
            },
            threadLink: {
                selector: "a.title",
                attr: 'href'
            },
            threadCommentsLink: {
                selector: "ul.flat-list.buttons .first a",
                attr: 'href'
            },
        }
    },
    next: {
        selector: "span.next-button a",
        attr: "href"
    }
}

const threadsReader = html => scrapeHTML(html, options)
module.exports = threadsReader