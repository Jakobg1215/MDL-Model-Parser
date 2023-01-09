import type FileReader from '../FileReader';
import ReadModel from './ReadModel';

class ReadBodyParts {
    // Size of 16 bytes
    public readonly sznameindex: string;
    public readonly nummodels: number;
    public readonly base: number;
    public readonly modelindex: number;

    public readonly models: ReadModel[] = [];

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.sznameindex = file.readStringZeroTerminated();
        this.nummodels = file.readInt();
        this.base = file.readInt();
        this.modelindex = file.readInt();

        for (let modelReader = 0; modelReader < this.nummodels; modelReader++) {
            file.setOffset(index + this.modelindex + modelReader * 148);
            this.models.push(new ReadModel(file));
        }
    }
}

export default ReadBodyParts;
