import type FileReader from '../FileReader';
import ReadModelHeader from './ReadModelHeader';

class ReadBodyPartHeader {
    /**
     * The count of how many models the body group has.
     *
     * @todo Find if the limit can go past 32.
     */
    public readonly numModels: number;

    /**
     * The byte offset to start reading the models.
     */
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
