import { BottlesOpts, defaultBottleOpts, IntRange } from "./shared"

export class BottlesSong {
    constructor(private opts: BottlesOpts = defaultBottleOpts) {}

    private currentAmount: BottlesOpts["startAt"] & BottlesOpts["endAt"] = this.opts.startAt

    public sing() {
        while (this.keepSinging()) {
            this.printLine1()     
            this.takeOneDown()
            this.printLine2()
            this.printLine3()
        }      
    }

    private keepSinging() {       
        return this.currentAmount >= this.opts.endAt
    }

    private printLine1() {
        this.opts.outputConsumer(this.line1())
    }

    private takeOneDown() {       
        --this.currentAmount
    }

    private printLine2() {
        this.opts.outputConsumer(this.line2())
    }

    private printLine3() {
        if (this.currentAmount > -1) {
            this.opts.outputConsumer("")
        }
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


function bottleWord(amount: number) {
    return `bottle${amount == 1 ? "" : "s"}`
}


function amountWordLC(amount: number) {
    return `${amount == 0 ? "no more" : amount}`
}

function amountWordUC(amount: number) {
    return `${amount == 0 ? "No more" : amount}`
}