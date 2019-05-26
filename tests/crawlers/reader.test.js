jest.mock('../../crawlers/subredditReader', () => jest.fn())

const subredditReader = require('../../crawlers/subredditReader')

const reader = require('../../crawlers/reader')
const getUrl = subreddit => `https://old.reddit.com/r/${subreddit}/top/`
const separator = ';'

describe('reader', () => {
    beforeEach(subredditReader.mockReset)

    it('should read each subreddit', async () => {
        const punctuation = 5000
        const subreddits = ['programming', 'dogs', 'brazil']
        subredditReader.mockImplementation(subreddit =>
            Promise.resolve([{prop: subreddits.findIndex(x => subreddit.match(x))}]))

        const result = await reader(subreddits.join(separator), punctuation)

        expect(result).toEqual(subreddits.map((subreddit, prop) => ({prop, subreddit})))
        expect(subredditReader.mock.calls)
            .toEqual(subreddits.map(subreddit => [getUrl(subreddit), punctuation]))
    })
})