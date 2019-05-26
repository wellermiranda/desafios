/*
número de upvotes,
subreddit,
título da thread,
link para os comentários da thread,
link da thread
 */

const {scrapeHTML} = require('scrape-it')
const {get} = require('./http')
const {toInt} = require('../utils')
const options = {
    items: {
        listItem: "div.thing:not(.promoted)",
        data: {
            upvotes: {
                selector: "div.score.likes",
                attr: 'title',
                convert: toInt
            },
            downvotes: {
                selector: "div.score.dislikes",
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


const action = async () => {
    const html = await get(`https://old.reddit.com/r/dogs/top/`)
    const result = scrapeHTML(html, options)
    console.log(result.items.length, result.items[0], result.next)
}

action()
