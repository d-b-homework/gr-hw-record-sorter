/**
 * Simple logger class
 */
export default class Logger {
    info(message: any): void {
        console.log(message);
    }

    error(message: any): void {
        console.error(message);
    }
}