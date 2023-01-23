import type FileReader from '../FileReader';

class ReadModelGroup {
    // Size of 8 bytes
    public readonly szlabelindex: string;
    public readonly sznameindex: string;

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.szlabelindex = file.readStringZeroTerminated(index);
        this.sznameindex = file.readStringZeroTerminated(index);
    }
}

export default ReadModelGroup;
