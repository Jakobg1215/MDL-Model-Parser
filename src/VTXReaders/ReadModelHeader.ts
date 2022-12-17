import FileReader from '../FileReader';
import ReadModelLODHeader from './ReadModelLODHeader';

class ReadModelHeader {
    public readonly numLODs: number;
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
