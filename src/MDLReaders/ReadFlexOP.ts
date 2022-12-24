import type FileReader from '../FileReader';

class ReadFlexOP {
    // Size of 8 bytes
    public readonly op: number;
    public readonly d: number;

    public constructor(file: FileReader) {
        this.op = file.readInt();
        this.d = file.readInt();
    }
}

export default ReadFlexOP;
