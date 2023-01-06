import type FileReader from '../FileReader';

class ReadFlexControllerUI {
    // Size of 20 bytes
    public readonly sznameindex: number;
    public readonly szindex0: number;
    public readonly szindex1: number;
    public readonly szindex2: number;
    public readonly remaptype: number;
    public readonly stereo: boolean;

    public constructor(file: FileReader) {
        this.sznameindex = file.readInt();
        this.szindex0 = file.readInt();
        this.szindex1 = file.readInt();
        this.szindex2 = file.readInt();
        this.remaptype = file.readByte();
        this.stereo = file.readBoolean();
        file.readByteArray(2); // unused
    }
}

export default ReadFlexControllerUI;
