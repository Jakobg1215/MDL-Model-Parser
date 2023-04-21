import type FileReader from '../../utilities/FileReader.ts';

class BoneStateChangeHeader {
    public readonly hardwareID: number;
    public readonly newBoneID: number;

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.hardwareID = file.readInt();
        this.newBoneID = file.readInt();
    }
}

export default BoneStateChangeHeader;
