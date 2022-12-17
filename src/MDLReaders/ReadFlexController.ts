import type FileReader from '../FileReader';

class ReadFlexController {
    public readonly sztypeindex: number;
    public readonly sznameindex: number;
    public readonly localToGlobal: number;
    public readonly min: number;
    public readonly max: number;

    public constructor(file: FileReader) {
        this.sztypeindex = file.readInt();
        this.sznameindex = file.readInt();
        this.localToGlobal = file.readInt();
        this.min = file.readFloat();
        this.max = file.readFloat();
    }
}

export default ReadFlexController;
