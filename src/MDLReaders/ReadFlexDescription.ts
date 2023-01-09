import type FileReader from '../FileReader';

class ReadFlexDescription {
    // Size of 4 bytes
    public readonly szFACSindex: string;

    public constructor(file: FileReader) {
        this.szFACSindex = file.readStringZeroTerminated();
    }
}

export default ReadFlexDescription;
