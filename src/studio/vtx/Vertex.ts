import type FileReader from '../../utilities/FileReader.ts';

class Vertex {
    public readonly boneWeightIndex: number[];
    public readonly numBones: number;
    public readonly origMeshVertID: number;
    public readonly boneID: number[];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.boneWeightIndex = [file.readUnsignedByte(), file.readUnsignedByte(), file.readUnsignedByte()];
        this.numBones = file.readUnsignedByte();
        this.origMeshVertID = file.readUnsignedShort();
        this.boneID = [file.readByte(), file.readByte(), file.readByte()];
    }
}

export default Vertex;
