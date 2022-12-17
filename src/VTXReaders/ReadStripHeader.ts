import type FileReader from '../FileReader';
import ReadBoneStateChangeHeader from './ReadBoneStateChangeHeader';

class ReadStripHeader {
    public readonly numIndices: number;
    public readonly indexOffset: number;
    public readonly numVerts: number;
    public readonly vertOffset: number;
    public readonly numBones: number;
    public readonly flags: number;
    public readonly numBoneStateChanges: number;
    public readonly boneStateChangeOffset: number;

    public readonly boneStateChanges: ReadBoneStateChangeHeader[] = [];

    public constructor(file: FileReader) {
        this.numIndices = file.readInt();
        this.indexOffset = file.readInt();
        this.numVerts = file.readInt();
        this.vertOffset = file.readInt();
        this.numBones = file.readShort();
        this.flags = file.readByte();
        this.numBoneStateChanges = file.readInt();
        this.boneStateChangeOffset = file.readInt();

        for (let boneStateChangeHeaderReader = 0; boneStateChangeHeaderReader < this.numBoneStateChanges; boneStateChangeHeaderReader++) {
            file.setOffset(this.boneStateChangeOffset + boneStateChangeHeaderReader * 8);
            this.boneStateChanges.push(new ReadBoneStateChangeHeader(file));
        }
    }
}

export default ReadStripHeader;
