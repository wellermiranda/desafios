jest.mock('../../crawlers/http', () => ({get: jest.fn()}))
jest.mock('../../crawlers/threadsReader', () => jest.fn())

const {flat} = require('../../utils')
const {get} = require('../../crawlers/http')
const threadsReader = require('../../crawlers/threadsReader')

const subredditReader = require('../../crawlers/subredditReader')
const PUNCTUATION = 5000

describe('subredditReader', () => {
    beforeEach(() => {
        get.mockReset()
        threadsReader.mockReset()
    })

    it('should read first subreddit page', async () => {
        const subreddit = 'programming'
        const url = `https://old.reddit.com/r/${subreddit}/top/`
        const html = '<p>oi</p>'
        const threads = {items: [{upvotes: 5000}]}
        get.mockReturnValueOnce(Promise.resolve(html))
        threadsReader.mockReturnValueOnce(Promise.resolve(threads))

        const result = await subredditReader(url)

        expect(result).toEqual(threads.items)
        expect(get).toBeCalledWith(`${url}?sort=top&t=day`)
        expect(threadsReader).toBeCalledWith(html)
    })

    it('should read next page while exists', async () => {
        const subreddit = 'programming'
        const url = `https://old.reddit.com/r/${subreddit}/top/`
        const html = '<p>oi</p>'
        const threads = [
            {items: [{upvotes: 5000}], next: `${url}?page=2`},
            {items: [{upvotes: 5001}], next: `${url}?page=3`},
            {items: [{upvotes: 5002}, {upvotes: 500}]}
        ]
        get.mockReturnValue(Promise.resolve(html))
        threadsReader
            .mockReturnValueOnce(Promise.resolve(threads[0]))
            .mockReturnValueOnce(Promise.resolve(threads[1]))
            .mockReturnValueOnce(Promise.resolve(threads[2]))

        const result = await subredditReader(url)

        expect(result).toEqual(flat(threads.map(({items}) => items))
            .filter(({upvotes}) => upvotes >= PUNCTUATION))
        expect(get.mock.calls).toEqual([
            [`${url}?sort=top&t=day`],
            [`${url}?page=2&sort=top&t=day`],
            [`${url}?page=3&sort=top&t=day`]
        ])
        expect(threadsReader).toBeCalledWith(html)
    })

    it('should check punctuation', async () => {
        const punctuation = 500
        const subreddit = 'programming'
        const url = `https://old.reddit.com/r/${subreddit}/top/`
        const html = '<p>oi</p>'
        const threads = {
            items: [
                {upvotes: 500},
                {upvotes: 499}
            ]
        }
        get.mockReturnValueOnce(Promise.resolve(html))
        threadsReader.mockReturnValueOnce(Promise.resolve(threads))

        const result = await subredditReader(url, punctuation)

        expect(result).toEqual([threads.items[0]])
        expect(get).toBeCalledWith(`${url}?sort=top&t=day`)
        expect(threadsReader).toBeCalledWith(html)
    })
})