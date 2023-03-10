import type FileReader from '../FileReader';

class ReadFlexControllerUI {
    // Size of 20 bytes
    public readonly sznameindex: string;
    public readonly szindex0: string;
    public readonly szindex1: string;
    public readonly szindex2: string;
    public readonly remaptype: number;
    public readonly stereo: boolean;

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.sznameindex = file.readStringZeroTerminated(index);
        this.szindex0 = file.readStringZeroTerminated(index);
        this.szindex1 = file.readStringZeroTerminated(index);
        this.szindex2 = file.readStringZeroTerminated(index);
        this.remaptype = file.readByte();
        this.stereo = file.readBoolean();
        file.readByteArray(2); // unused
    }
}

export default ReadFlexControllerUI;
