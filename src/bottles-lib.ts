export function bottleWord(amount: number) {
    return `bottle${amount == 1 ? "" : "s"}`
}


export function amountWordLC(amount: number) {
    return `${amount == 0 ? "no more" : amount}`
}

export function amountWordUC(amount: number) {
    return `${amount == 0 ? "No more" : amount}`
}