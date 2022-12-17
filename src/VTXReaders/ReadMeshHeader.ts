import type FileReader from '../FileReader';
import ReadStripGroupHeader from './ReadStripGroupHeader';

class ReadMeshHeader {
    public readonly numStripGroups: number;
    public readonly stripGroupHeaderOffset: number;
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
