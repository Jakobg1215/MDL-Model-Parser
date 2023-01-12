import type FileReader from "../FileReader";

class ReadAutoLayer {
    // Size of 24 bytes
    public readonly iSequence: number;
    public readonly iPose: number;
    public readonly flags: number;
    public readonly start: number;
    public readonly peak: number;
    public readonly tail: number;
    public readonly end: number;

    public constructor(file: FileReader) {
        this.iSequence = file.readShort();
        this.iPose = file.readShort();
        this.flags = file.readInt();
        this.start = file.readFloat();
        this.peak = file.readFloat();
        this.tail = file.readFloat();
        this.end = file.readFloat();
    }
}

export default ReadAutoLayer;