import type FileReader from '../FileReader';

class ReadBoneController {
    // Size of 56 bytes
    public readonly bone: number;
    public readonly type: number;
    public readonly start: number;
    public readonly end: number;
    public readonly rest: number;
    public readonly inputfield: number;

    public constructor(file: FileReader) {
        this.bone = file.readInt();
        this.type = file.readInt();
        this.start = file.readFloat();
        this.end = file.readFloat();
        this.rest = file.readInt();
        this.inputfield = file.readInt();
        file.readIntArray(8); // unused
    }
}

export default ReadBoneController;
