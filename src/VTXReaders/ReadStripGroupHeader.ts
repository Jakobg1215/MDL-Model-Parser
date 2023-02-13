import type FileReader from '../FileReader';
import ReadStripHeader from './ReadStripHeader';
import ReadVertext from './ReadVertext';

class ReadStripGroupHeader {
    /**
     * The count of how many vertices there are.
     *
     * @todo Find out what these are used for.
     */
    public readonly numVerts: number;

    /**
     * The byte offset to start reading the vertices.
     */
    public readonly vertOffset: number;

    /**
     * The count of how many indices there are.
     *
     * @todo Find out what these point twards.
     */
    public readonly numIndices: number;

    /**
     * The byte offset to start reading the indices.
     */
    public readonly indexOffset: number;

    /**
     * The count of how many strips there are.
     *
     * @todo Find out what these are used for.
     */
    public readonly numStrips: number;

    /**
     * The byte offset to start reading the strips.
     */
    public readonly stripOffset: number;

    /**
     * This has 4 known flags.
     *
     * STRIPGROUP_IS_FLEXED = 1
     *
     * STRIPGROUP_IS_HWSKINNED = 2
     *
     * STRIPGROUP_IS_DELTA_FLEXED = 4
     *
     * STRIPGROUP_SUPPRESS_HW_MORPH = 8 This is a temporary flag used at run time.
     *
     * @todo What do theses values specify
     */
    public readonly flags: number;

    public readonly strips: ReadStripHeader[] = [];
    public readonly verticies: ReadVertext[] = [];
    public readonly indices: number[] = [];

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.numVerts = file.readInt();
        this.vertOffset = file.readInt();
        this.numIndices = file.readInt();
        this.indexOffset = file.readInt();
        this.numStrips = file.readInt();
        this.stripOffset = file.readInt();
        this.flags = file.readByte();

        for (let stripHeaderReader = 0; stripHeaderReader < this.numStrips; stripHeaderReader++) {
            file.setOffset(index + this.stripOffset + stripHeaderReader * 27);
            this.strips.push(new ReadStripHeader(file));
        }

        for (let vertReader = 0; vertReader < this.numVerts; vertReader++) {
            file.setOffset(index + this.vertOffset + vertReader * 9);
            this.verticies.push(new ReadVertext(file));
        }

        for (let indicesReader = 0; indicesReader < this.numIndices; indicesReader++) {
            file.setOffset(index + this.indexOffset + indicesReader * 2);
            this.indices.push(file.readShort());
        }
    }
}

export default ReadStripGroupHeader;
