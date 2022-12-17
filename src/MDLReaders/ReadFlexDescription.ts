import type FileReader from '../FileReader';

class ReadFlexDescription {
    public readonly szFACSindex: number;

    public constructor(file: FileReader) {
        this.szFACSindex = file.readInt();
    }
}

export default ReadFlexDescription;
