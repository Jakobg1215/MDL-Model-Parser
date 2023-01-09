import type FileReader from "../FileReader";

class ReadModelGroup {
    // Size of 8 bytes
    public readonly szlabelindex: string;
    public readonly sznameindex: string;

    public constructor(file: FileReader) {
        this.szlabelindex = file.readStringZeroTerminated();;
        this.sznameindex = file.readStringZeroTerminated();
    }
}

export default ReadModelGroup;
