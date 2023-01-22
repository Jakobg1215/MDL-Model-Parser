import type FileReader from '../FileReader';

class ReadActivityModifier {
    public readonly sznameindex: string;

    public constructor(file: FileReader) {
        this.sznameindex = file.readStringZeroTerminated();
    }
}

export default ReadActivityModifier;
