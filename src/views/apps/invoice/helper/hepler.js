export const calculateTax = (amount, taxRateInPercentage, TaxType) => {
    let calculatedTax = 0
    if (TaxType === 1) { //Inclusive
        calculatedTax = parseFloat(amount) - (parseFloat(amount) * (100 / (100 + parseFloat(taxRateInPercentage))))
        // calculatedTax = parseFloat(amount) - parseFloat(calculatedTax);

    } else if (TaxType === 2) { //Exclusive
        calculatedTax = (parseFloat(amount) * parseFloat(taxRateInPercentage)) / 100
    }
    return parseFloat(calculatedTax)
}

export const parser = (str) => {

    return JSON.parse(str.replace(/\\/g, ''))

}