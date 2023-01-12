import type FileReader from "../FileReader";

class ReadEvent {
    // Size of 80 bytes
    public readonly cycle: number;
    public readonly event: number;
    public readonly type: number;
    public readonly options: string;
    public readonly szeventindex: string;

    public constructor(file: FileReader) {
        this.cycle = file.readFloat();
        this.event = file.readInt();
        this.type = file.readInt();
        this.options = file.readString(64);
        this.szeventindex = file.readStringZeroTerminated();
    }
}

export default ReadEvent;