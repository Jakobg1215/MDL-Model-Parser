import type FileReader from '../FileReader';

class ReadHeader {
    public readonly version: number;
    public readonly vertCacheSize: number;
    public readonly maxBonesPerStrip: number;
    public readonly maxBonesPerTri: number;
    public readonly maxBonesPerVert: number;
    public readonly checksum: number;
    public readonly numLODs: number;
    public readonly materialReplacementListOffset: number;
    public readonly numBodyParts: number;
    public readonly bodyPartOffset: number;

    public constructor(file: FileReader) {
        this.version = file.readInt();
        this.vertCacheSize = file.readInt();
        this.maxBonesPerStrip = file.readShort();
        this.maxBonesPerTri = file.readShort();
        this.maxBonesPerVert = file.readInt();
        this.checksum = file.readInt();
        this.numLODs = file.readInt();
        this.materialReplacementListOffset = file.readInt();
        this.numBodyParts = file.readInt();
        this.bodyPartOffset = file.readInt();
    }
}

export default ReadHeader;
