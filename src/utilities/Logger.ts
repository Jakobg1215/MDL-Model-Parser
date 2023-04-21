import { FileHandler } from 'https://deno.land/std@0.184.0/log/handlers.ts';

class Logger {
    private readonly logFile;

    public constructor(fileName: string) {
        this.logFile = new FileHandler('INFO', { filename: fileName + '.txt', mode: 'w' });
        this.logFile.setup();
    }

    public log(message: string): void {
        this.logFile.log(message);
    }

    public logStudioRead(name: string, start: number, end: number, count?: number): void {
        let message = `${name} Start: ${start} End: ${end} Size: ${end - start}`;
        if (count) message += ` Count: ${count} SizePer: ${(end - start) / count}`;

        this.log(message);
    }

    public close() {
        this.logFile.flush();
    }
}

export default Logger;
