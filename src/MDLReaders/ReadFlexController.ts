import type FileReader from '../FileReader';

class ReadFlexController {
    // Size of 20 bytes
    public readonly sztypeindex: String;
    public readonly sznameindex: string;
    public readonly localToGlobal: number;
    public readonly min: number;
    public readonly max: number;

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.sztypeindex = file.readStringZeroTerminated(index);
        this.sznameindex = file.readStringZeroTerminated(index);
        this.localToGlobal = file.readInt();
        this.min = file.readFloat();
        this.max = file.readFloat();
    }
}

export default ReadFlexController;
