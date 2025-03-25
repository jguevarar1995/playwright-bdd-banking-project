export function getRandomTransactionAmount(min: number = 100, max: number = 100000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}