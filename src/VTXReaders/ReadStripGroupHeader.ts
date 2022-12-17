import type FileReader from '../FileReader';
import ReadStripHeader from './ReadStripHeader';
import ReadVertext from './ReadVertext';

class ReadStripGroupHeader {
    public readonly numVerts: number;
    public readonly vertOffset: number;
    public readonly numIndices: number;
    public readonly indexOffset: number;
    public readonly numStrips: number;
    public readonly stripOffset: number;
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
