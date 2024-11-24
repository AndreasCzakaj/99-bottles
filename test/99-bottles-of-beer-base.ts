import { BottlesOpts, OutputConsumer } from "@src/shared"

export const bottlesTest = (name: string, bottles: (opts?: BottlesOpts) => void) => {
  describe(`99-bottles-of-beer: ${name}`, () => {
    const text991 = "99 bottles of beer on the wall, 99 bottles of beer."
    const text992 = "Take one down and pass it around, 98 bottles of beer on the wall."
    const text981 = "98 bottles of beer on the wall, 98 bottles of beer."
    const text982 = "Take one down and pass it around, 97 bottles of beer on the wall."
    const text031 = "3 bottles of beer on the wall, 3 bottles of beer."
    const text032 = "Take one down and pass it around, 2 bottles of beer on the wall."
    const text021 = "2 bottles of beer on the wall, 2 bottles of beer."
    const text022 = "Take one down and pass it around, 1 bottle of beer on the wall."
    const text011 = "1 bottle of beer on the wall, 1 bottle of beer."
    const text012 = "Take one down and pass it around, no more bottles of beer on the wall."
    const text001 = "No more bottles of beer on the wall, no more bottles of beer."
    const text002 = "Go to the store and buy some more, 99 bottles of beer on the wall."

    let collected: string[]
    let outputConsumer: OutputConsumer = (text: string) => collected.push(text)

    beforeEach(() => {
      collected = []
    })

    test.each`
      startAt | endAt   | expected
      ${99} | ${99} | ${[text991, text992, ""]}
      ${3}  | ${3}  | ${[text031, text032, ""]}
      ${2}  | ${2}  | ${[text021, text022, ""]}
      ${1}  | ${1}  | ${[text011, text012, ""]}
      ${99} | ${98} | ${[text991, text992, "", text981, text982, ""]}
    `("Parameterized: $start, $end", ({ startAt, endAt, expected }) => {
      bottles({outputConsumer, startAt, endAt})
      expect(collected).toEqual(expected)
    })

    test("test 0", () => {
      const startAt = 42
      const endAt = 0

      bottles({outputConsumer, startAt, endAt})
      expect(collected).toHaveLength(128) // 42 * 3 + 2
      expect(collected[121]).toEqual(text022)
      expect(collected[122]).toEqual("")
      expect(collected[123]).toEqual(text011)
      expect(collected[124]).toEqual(text012)
      expect(collected[125]).toEqual("")
      expect(collected[126]).toEqual(text001)
      expect(collected[127]).toEqual(
        "Go to the store and buy some more, 42 bottles of beer on the wall."
      )
    })

    describe("integration", () => {
      let consoleLogOrig: typeof console.log

      beforeAll(() => {
        consoleLogOrig = console.log
        console.log = outputConsumer
      })

      afterAll(() => {
        console.log = consoleLogOrig
      })

      test("all", () => {
        bottles()
        expect(collected).toHaveLength(299)
        expect(collected[0]).toEqual(text991)
        expect(collected[2]).toEqual("")
        expect(collected[292]).toEqual(text022)
        expect(collected[293]).toEqual("")
        expect(collected[294]).toEqual(text011)
        expect(collected[295]).toEqual(text012)
        expect(collected[296]).toEqual("")
        expect(collected[297]).toEqual(text001)
        expect(collected[298]).toEqual(text002)
      })
    })

    test("just print ...", () => {
      bottles()
    })
  })
}
