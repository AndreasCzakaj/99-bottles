import { BottlesOpts, defaultBottleOpts, } from "./shared"
import { bottleWord, amountWordLC, amountWordUC } from "./bottles-lib"

export class BottlesIterator {
     
    constructor(private opts: Omit<BottlesOpts, "outputConsumer"> = defaultBottleOpts) {}

    private currentAmount: BottlesOpts["startAt"] & BottlesOpts["endAt"] = this.opts.startAt
    private currentLineNumber: number = 1;
   
    public next(): string {
      const lineNo = this.currentLineNumber
      let out = undefined

      if (lineNo % 3 === 1) {
        out = this.line1()
        this.takeOneDown()
        ++this.currentLineNumber
      } else if (lineNo % 3 === 2) {
        out = this.line2()
        if (this.keepSinging() || this.opts.endAt > 0) {
            ++this.currentLineNumber
        } else {
            this.currentLineNumber = 6
        }
      }
      else {
        out = ""
        this.currentLineNumber = 1
        if (!this.keepSinging()) {
            this.currentLineNumber = 6
        }
      }
      
      return out
     }
     
    public hasNext() {
      return this.currentLineNumber < 4;
    }

    private keepSinging() {       
        return this.currentAmount >= this.opts.endAt
    }

    private takeOneDown() {       
        --this.currentAmount
    }

    private line1() {
        const amount = this.currentAmount
        const part1 = `${amountWordUC(amount)} ${bottleWord(amount)} of beer on the wall,`
        const part2 = `${amountWordLC(amount)} ${bottleWord(amount)} of beer.`
        return `${part1} ${part2}`
    }

    private line2() {
        return this.currentAmount < 0 ? this.line2Zero() : this.line2NonZero()
    }

    private getResetAmount = () => this.opts.startAt

    private line2NonZero() {
        return `Take one down and pass it around, ${amountWordLC(this.currentAmount)} ${bottleWord(this.currentAmount)} of beer on the wall.`
    }

    private line2Zero() {
        const resetAmount = this.getResetAmount()
        const part1 = `Go to the store and buy some more,`
        const part2 = `${amountWordLC(resetAmount)} ${bottleWord(resetAmount)} of beer on the wall.`
        return `${part1} ${part2}`
    }
}