import type FileReader from '../../utilities/FileReader.ts';
import type Model from './Model.ts';

class BodyPart {
    public readonly sznameindex: string;
    public readonly nummodels: number;
    public readonly base: number;
    public readonly modelindex: number;

    public models: Model[] = [];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.sznameindex = file.readZeroTerminatedString(fileStart);
        this.nummodels = file.readInt();
        this.base = file.readInt();
        this.modelindex = file.readInt();
    }
}

export default BodyPart;
