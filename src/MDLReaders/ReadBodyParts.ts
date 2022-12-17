import type FileReader from '../FileReader';
import ReadModel from './ReadModel';

class ReadBodyParts {
    public readonly sznameindex: number;
    public readonly nummodels: number;
    public readonly base: number;
    public readonly modelindex: number;

    public readonly models: ReadModel[] = [];

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.sznameindex = file.readInt();
        this.nummodels = file.readInt();
        this.base = file.readInt();
        this.modelindex = file.readInt();
        const offset = file.fileReadOffset;

        file.setOffset(index + this.modelindex);
        for (let modelReader = 0; modelReader < this.nummodels; modelReader++) {
            this.models.push(new ReadModel(file));
        }

        file.setOffset(offset);
    }
}

export default ReadBodyParts;
