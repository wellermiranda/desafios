jest.mock('../../strings/justifier.js')

const breaker = require('../../strings/breaker.js')
const justifier = require('../../strings/justifier.js')

describe('breaker', () => {
    beforeEach(justifier.mockReset)

    it('should break lines with default characters by line (40)', () => {
        const text = 'In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.\n\nAnd God said, "Let there be light," and there was light. God saw that the light was good, and he separated the light from the darkness. God called the light "day," and the darkness he called "night." And there was evening, and there was morning - the first day.'
        const expected = 'In the beginning God created the heavens\nand the earth. Now the earth was\nformless and empty, darkness was over\nthe surface of the deep, and the Spirit\nof God was hovering over the waters.\n\nAnd God said, "Let there be light," and\nthere was light. God saw that the light\nwas good, and he separated the light\nfrom the darkness. God called the light\n"day," and the darkness he called\n"night." And there was evening, and\nthere was morning - the first day.'

        const actual = breaker({text, justify: false})

        expect(justifier).not.toBeCalled()
        expect(actual).toEqual(expected)
    })

    it('should break lines with 12 characters by line', () => {
        const text = 'God created the heavens and the earth.\n\nGod created the heavens and the earth.'
        const expected = 'God created\nthe heavens\nand the\nearth.\n\nGod created\nthe heavens\nand the\nearth.'
        const charactersByLine = 12

        const actual = breaker({text, charactersByLine, justify: false})

        expect(justifier).not.toBeCalled()
        expect(actual).toEqual(expected)
    })

    it('should justify lines', () => {
        const line = 'and the earth. Now the earth was'
        const expected = 'and   the  earth.   Now  the  earth  was'
        const charactersByLine = 40
        justifier.mockReturnValueOnce(expected)

        const actual = breaker({text: line, justify: true, charactersByLine})

        expect(justifier).toBeCalledWith({ charactersByLine, line })
        expect(actual).toEqual(expected)
    })
})