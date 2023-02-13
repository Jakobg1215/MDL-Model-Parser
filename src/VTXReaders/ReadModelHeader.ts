import type FileReader from '../FileReader';
import ReadModelLODHeader from './ReadModelLODHeader';

class ReadModelHeader {
    /**
     * The count of how many lods there are.
     *
     * This should be the same as the header.
     */
    public readonly numLODs: number;

    /**
     * The byte offset to start reading the lods.
     */
    public readonly lodOffset: number;

    public readonly modelLODs: ReadModelLODHeader[] = [];

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.numLODs = file.readInt();
        this.lodOffset = file.readInt();

        for (let modelLODHeaderReader = 0; modelLODHeaderReader < this.numLODs; modelLODHeaderReader++) {
            file.setOffset(index + this.lodOffset + modelLODHeaderReader * 12);
            this.modelLODs.push(new ReadModelLODHeader(file));
        }
    }
}

export default ReadModelHeader;
