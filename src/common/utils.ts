export const getRsFromPaise = (paise: number) => {
    const rupees = paise / 100;
    return `₹ ${rupees}`
}

export const buildDateStringFromEpoch = (epoch: number): string => {
    const date = new Date(epoch);
    const dateString = date.toDateString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`
    return `${dateString} ${timeString}`;
}