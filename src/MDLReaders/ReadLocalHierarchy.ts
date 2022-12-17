import type FileReader from '../FileReader';

class ReadLocalHierarchy {
    public readonly iBone: number;
    public readonly iNewParent: number;
    public readonly start: number;
    public readonly peak: number;
    public readonly tail: number;
    public readonly end: number;
    public readonly iStart: number;
    public readonly localanimindes: number;

    public constructor(file: FileReader) {
        this.iBone = file.readInt();
        this.iNewParent = file.readInt();
        this.start = file.readFloat();
        this.peak = file.readFloat();
        this.tail = file.readFloat();
        this.end = file.readFloat();
        this.iStart = file.readInt();
        this.localanimindes = file.readInt();
        file.readIntArray(4); // unused
    }
}

export default ReadLocalHierarchy;
