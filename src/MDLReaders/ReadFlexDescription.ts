import type FileReader from '../FileReader';

class ReadFlexDescription {
    // Size of 4 bytes
    public readonly szFACSindex: number;

    public constructor(file: FileReader) {
        this.szFACSindex = file.readInt();
    }
}

export default ReadFlexDescription;
