import type FileReader from "../FileReader";

class ReadModelGroup {
    // Size of 8 bytes
    public readonly szlabelindex: number;
    public readonly sznameindex: number;

    public constructor(file: FileReader) {
        this.szlabelindex = file.readInt();
        this.sznameindex = file.readInt();
    }
}

export default ReadModelGroup;
