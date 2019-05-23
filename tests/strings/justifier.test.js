const justifier = require('../../strings/justifier.js')

describe('justifier', () => {
    it('should justify lines', () => {
        const lines = [
            'and the earth. Now the earth was',
            'formless and empty, darkness was over',
            'And God said, "Let there be light," and',
            'o paralelepipedo o paralelepipedo o',
            'of God was hovering over the waters.'
        ]
        const expected = [
            'and   the  earth.   Now  the  earth  was',
            'formless  and empty,  darkness was  over',
            'And  God said, "Let there be light," and',
            'o   paralelepipedo  o  paralelepipedo  o',
            'of  God was  hovering over  the  waters.',
        ]

        const results = lines.map(line => justifier({
            line, charactersByLine: 40
        }))

        expect(results).toEqual(expected)
    })
})