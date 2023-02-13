import type FileReader from '../FileReader';

class ReadHeader {
    /**
     * The version of the file.
     *
     * This will always be 7.
     */
    public readonly version: number;

    /**
     * sw is always 512
     *
     * dx80 is always 24
     *
     * dx90 is always 24
     *
     * @todo Find what this is used for.
     */
    public readonly vertCacheSize: number;

    /**
     * sw is always 512
     *
     * dx80 is always 16
     *
     * dx90 is always 53
     *
     * @todo Find what this is used for.
     */
    public readonly maxBonesPerStrip: number;

    /**
     * This will always be 9.
     *
     * @todo Find what this is used for.
     */
    public readonly maxBonesPerTri: number;

    /**
     * This will always be 3.
     *
     * @todo Find what this is used for.
     */
    public readonly maxBonesPerVert: number;

    /**
     * This should be the same as the MDL file checksum.
     *
     * If the checksum is diffrent than the MDL, the model won't load.
     */
    public readonly checksum: number;

    /**
     * The amount of detail levels the model has.
     *
     * This will be between 1 - 8.
     */
    public readonly numLODs: number;

    /**
     * The byte offset to start reading material replacement lists.
     *
     * This is always after body parts.
     */
    public readonly materialReplacementListOffset: number;

    /**
     * The amount of body parts the model has.
     *
     * @todo Find if the limit can go past 32.
     */
    public readonly numBodyParts: number;

    /**
     * The byte offset to start reading the body parts
     */
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
