import type FileReader from '../FileReader';

class ReadAnimation {
    public readonly bone: number;
    public readonly flags: number;
    public readonly nextoffset: number;

    public constructor(file: FileReader) {
        this.bone = file.readByte();
        this.flags = file.readByte();
        this.nextoffset = file.readShort();
    }
}

export default ReadAnimation;
