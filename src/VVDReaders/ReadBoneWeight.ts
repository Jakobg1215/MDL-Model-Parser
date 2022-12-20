import type FileReader from '../FileReader';

class ReadBoneWeight {
    // Size of 16 bytes
    public readonly weight: [number, number, number];
    public readonly bone: [number, number, number];
    public readonly numbones: number;

    public constructor(file: FileReader) {
        this.weight = file.readFloatArray(3) as any;
        this.bone = file.readByteArray(3) as any;
        this.numbones = file.readByte();
    }
}

export default ReadBoneWeight;
