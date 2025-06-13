export function transformDate(date: string): string {
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"]
    
    const [year, month, day] = date.split("-")

    return `${months[parseInt(month) - 1]} ${day}, ${year}`
}

export function titleCase(words: string): string {
    return words[0] + words.slice(1).toLocaleLowerCase()
}