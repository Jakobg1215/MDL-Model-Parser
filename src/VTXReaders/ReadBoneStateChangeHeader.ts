import type FileReader from '../FileReader';

class ReadBoneStateChangeHeader {
    public readonly hardwareID: number;
    public readonly newBoneID: number;

    public constructor(file: FileReader) {
        this.hardwareID = file.readInt();
        this.newBoneID = file.readInt();
    }
}

export default ReadBoneStateChangeHeader;
