import { BottlesSong } from "@src/99-bottles-of-beer-oop";
import { bottlesTest } from "./99-bottles-of-beer-base";
import { BottlesOpts, defaultBottleOpts } from "@src/shared";
import { BottlesIterator } from "@src/99-bottles-of-beer-iterator";

const bottles = (passedOpts?: BottlesOpts) => {
    const opts = {...defaultBottleOpts, ...passedOpts}
    const iterator = new BottlesIterator(opts)

    while(iterator.hasNext()) {
        opts.outputConsumer(iterator.next())
    }
}

bottlesTest("iterator-style implementation", bottles)