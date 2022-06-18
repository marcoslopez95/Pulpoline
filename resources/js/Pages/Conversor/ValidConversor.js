const toCurrency = () => {
    return amount.value === null || form.to === null ?
            '' :
            amount.value +' '+ form.to.name
}

const fromCurrency = () => {
    return amount.value === null || form.from === null ?
            '' :
            amount.value +' '+ form.from.name + ' = '
}

const validateForm = () => {
    return amount.value !== null &&
        form.from !== null && form.to !== null
}

export {
    validateForm,
    fromCurrency,
    toCurrency
}
