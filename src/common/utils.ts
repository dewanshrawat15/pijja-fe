export const getRsFromPaise = (paise: number) => {
    const rupees = paise / 100;
    return `₹ ${rupees}`
}