import type FileReader from "../FileReader";

class ReadPoseParamDescription {
    // Size of 20 bytes
    public readonly sznameindex: string;
    public readonly flags: number;
    public readonly start: number;
    public readonly end: number;
    public readonly loop: number;

    public constructor(file: FileReader) {
        this.sznameindex = file.readStringZeroTerminated();
        this.flags = file.readInt();
        this.start = file.readFloat();
        this.end = file.readFloat();
        this.loop = file.readFloat();
    }
    
}

export default ReadPoseParamDescription;