import type FileReader from '../../utilities/FileReader.ts';

class BoneController {
    public readonly bone: number;
    public readonly type: number;
    public readonly start: number;
    public readonly end: number;
    public readonly rest: number;
    public readonly inputfield: number;
    public readonly unused: number[];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.bone = file.readInt();
        this.type = file.readInt();
        this.start = file.readFloat();
        this.end = file.readFloat();
        this.rest = file.readInt();
        this.inputfield = file.readInt();
        this.unused = file.readIntArray(8);
    }
}

export default BoneController;
