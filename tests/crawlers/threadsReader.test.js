jest.mock('scrape-it', () => ({scrapeHTML: jest.fn()}))

const {scrapeHTML} = require('scrape-it')
const {toInt} = require('../../utils')

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

const threadsReader = require('../../crawlers/threadsReader')

describe('subredditReader', () => {
    beforeEach(scrapeHTML.mockReset)

    it('should read first subreddit page', async () => {
        const html = '<p>oi</p>'
        const threads = {items: [{whatever: 1}]}
        scrapeHTML.mockReturnValueOnce(Promise.resolve(threads))

        const result = await threadsReader(html)

        expect(scrapeHTML).toBeCalledWith(html, options)
        expect(result).toEqual(threads)
    })
})