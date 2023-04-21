import type FileReader from '../../utilities/FileReader.ts';

class BoneWeight {
    public readonly weight: number[];
    public readonly bone: number[];
    public readonly numbones: number;

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.weight = file.readFloatArray(3);
        this.bone = file.readByteArray(3);
        this.numbones = file.readUnsignedByte();
    }
}

export default BoneWeight;
