export type Consumer<T> = (value: T) => void

export type OutputConsumer = Consumer<string>

export const consoleLogOutputConsumer: OutputConsumer = (line: string) =>
  console.log(line)

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>

export type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>

export type BottlesOpts = {
  outputConsumer: OutputConsumer
  startAt: IntRange<0, 100>
  endAt: IntRange<0, 100>
}

export const defaultBottleOpts: BottlesOpts = {
  outputConsumer: consoleLogOutputConsumer,
  startAt: 99,
  endAt: 0,
}
