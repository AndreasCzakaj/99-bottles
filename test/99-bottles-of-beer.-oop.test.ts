import { BottlesSong } from "@src/99-bottles-of-beer-oop";
import { bottlesTest } from "./99-bottles-of-beer-base";
import { BottlesOpts } from "@src/shared";

bottlesTest("OOP-style implementation", (opts?: BottlesOpts) => (new BottlesSong(opts)).sing())