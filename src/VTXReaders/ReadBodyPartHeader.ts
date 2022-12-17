import type FileReader from '../FileReader';
import ReadModelHeader from './ReadModelHeader';

class ReadBodyPartHeader {
    public readonly numModels: number;
    public readonly modelOffset: number;

    public readonly models: ReadModelHeader[] = [];

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.numModels = file.readInt();
        this.modelOffset = file.readInt();

        for (let modelReader = 0; modelReader < this.numModels; modelReader++) {
            file.setOffset(index + this.modelOffset + modelReader * 8);
            this.models.push(new ReadModelHeader(file));
        }
    }
}

export default ReadBodyPartHeader;
