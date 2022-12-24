import type FileReader from '../FileReader';

class ReadVertext {
    public readonly boneWeightIndex: [number, number, number];
    public readonly numBones: number;
    public readonly origMeshVertID: number;
    public readonly boneID: [number, number, number];

    public constructor(file: FileReader) {
        this.boneWeightIndex = file.readByteArray(3) as any;
        this.numBones = file.readByte();
        this.origMeshVertID = file.readShort();
        this.boneID = file.readByteArray(3) as any;
    }
}

export default ReadVertext;
