import { BottlesOpts, defaultBottleOpts } from "./shared"
import { bottleWord, amountWordLC, amountWordUC } from "./bottles-lib"

export function bottles(opts: BottlesOpts = defaultBottleOpts) {
    const {outputConsumer, startAt, endAt} = opts

    const line1 = (amount: number) => `${amountWordUC(amount)} ${bottleWord(amount)} of beer on the wall, ${amountWordLC(amount)} ${bottleWord(amount)} of beer.`
    const line2 = (amount: number, resetAmount: number) => amount < 0 ? line2Zero(resetAmount) : line2NonZero(amount)

    const line2NonZero  = (amount: number)      => `Take one down and pass it around, ${amountWordLC(amount)} ${bottleWord(amount)} of beer on the wall.`
    const line2Zero     = (resetAmount: number) => `Go to the store and buy some more, ${amountWordLC(resetAmount)} ${bottleWord(resetAmount)} of beer on the wall.`
    
    let amount = startAt
    while (amount >= endAt) {
        outputConsumer(line1(amount))

        const newAmount = --amount
        outputConsumer(line2(newAmount, startAt))
        if (newAmount > -1) {
            outputConsumer("")
        }
    }      
}
