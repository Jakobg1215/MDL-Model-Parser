import type FileReader from "../FileReader";

class ReadAnimationBlock {
    // Size of 8 bytes
    public readonly datastart: number;
    public readonly dataend: number;

    public constructor(file: FileReader) {
        this.datastart = file.readInt();
        this.dataend = file.readInt();
    }
}

export default ReadAnimationBlock;
