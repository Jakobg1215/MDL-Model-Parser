import type FileReader from '../FileReader';
import ReadStripGroupHeader from './ReadStripGroupHeader';

class ReadMeshHeader {
    /**
     * The count of how many strip groups there are.
     */
    public readonly numStripGroups: number;

    /**
     * The byte offset to start reading the strip groups.
     */
    public readonly stripGroupHeaderOffset: number;

    /**
     * This has 2 known flags
     *
     * MESH_IS_TEETH = 1
     *
     * MESH_IS_EYES = 2
     *
     * @todo What do theses values specify
     */
    public readonly flags: number;

    public readonly stripGroups: ReadStripGroupHeader[] = [];

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.numStripGroups = file.readInt();
        this.stripGroupHeaderOffset = file.readInt();
        this.flags = file.readByte();

        for (let stripGroupHeaderReader = 0; stripGroupHeaderReader < this.numStripGroups; stripGroupHeaderReader++) {
            file.setOffset(index + this.stripGroupHeaderOffset + stripGroupHeaderReader * 25);
            this.stripGroups.push(new ReadStripGroupHeader(file));
        }
    }
}

export default ReadMeshHeader;
