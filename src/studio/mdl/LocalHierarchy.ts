import type FileReader from '../../utilities/FileReader.ts';

class LocalHierarchy {
    public readonly iBone: number;
    public readonly iNewParent: number;
    public readonly start: number;
    public readonly peak: number;
    public readonly tail: number;
    public readonly end: number;
    public readonly iStart: number;
    public readonly localanimindex: number;
    public readonly unused: number[];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.iBone = file.readInt();
        this.iNewParent = file.readInt();
        this.start = file.readFloat();
        this.peak = file.readFloat();
        this.tail = file.readFloat();
        this.end = file.readFloat();
        this.iStart = file.readInt();
        this.localanimindex = file.readInt();
        this.unused = file.readIntArray(4);
    }
}

export default LocalHierarchy;
