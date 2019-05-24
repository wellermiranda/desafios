const justifier = require('../../strings/justifier.js')

describe('justifier', () => {
    it('should justify lines', () => {
        const lines = [
            ['and the earth. Now the earth was', 40],
            ['formless and empty, darkness was over', 40],
            ['And God said, "Let there be light," and', 40],
            ['o paralelepipedo o paralelepipedo o', 40],
            ['of God was hovering over the waters.', 40],
            ['the darkness he called', 30],
            ['- the first day.', 30],
        ]
        const expected = [
            'and   the  earth.   Now  the  earth  was',
            'formless  and empty,  darkness was  over',
            'And  God said, "Let there be light," and',
            'o   paralelepipedo  o  paralelepipedo  o',
            'of  God was  hovering over  the  waters.',
            'the    darkness   he    called',
            '-      the     first      day.'
        ]

        const results = lines.map(([line, charactersByLine]) =>
            justifier({
                line, charactersByLine
            }))

        expect(results).toEqual(expected)
    })
})