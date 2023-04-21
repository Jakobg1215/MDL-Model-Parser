import type FileReader from '../../utilities/FileReader.ts';

import type BoneStateChangeHeader from './BoneStateChangeHeader.ts';

class StripHeader {
    public readonly numIndices: number;
    public readonly indexOffset: number;
    public readonly numVerts: number;
    public readonly vertOffset: number;
    public readonly numBones: number;
    public readonly flags: number;
    public readonly numBoneStateChanges: number;
    public readonly boneStateChangeOffset: number;
    public readonly numTopologyIndices: number | null = null;
    public readonly topologyOffset: number | null = null;

    public readonly boneStateChanges: BoneStateChangeHeader[] = [];

    public constructor(file: FileReader, public readonly fileStart: number, public readonly hasTopology: boolean) {
        this.numIndices = file.readInt();
        this.indexOffset = file.readInt();
        this.numVerts = file.readInt();
        this.vertOffset = file.readInt();
        this.numBones = file.readShort();
        this.flags = file.readUnsignedByte();
        this.numBoneStateChanges = file.readInt();
        this.boneStateChangeOffset = file.readInt();

        if (hasTopology) {
            this.numTopologyIndices = file.readInt();
            this.topologyOffset = file.readInt();
        }
    }
}

export default StripHeader;
