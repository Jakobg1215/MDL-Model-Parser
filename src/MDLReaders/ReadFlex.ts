import FileReader from '../FileReader';

class ReadFlex {
    public readonly flexdesc: number;
    public readonly target0: number;
    public readonly target1: number;
    public readonly target2: number;
    public readonly target3: number;
    public readonly numverts: number;
    public readonly vertindex: number;
    public readonly flexpair: number;
    public readonly vertanimtype: number;

    public constructor(file: FileReader) {
        this.flexdesc = file.readInt();
        this.target0 = file.readFloat();
        this.target1 = file.readFloat();
        this.target2 = file.readFloat();
        this.target3 = file.readFloat();
        this.numverts = file.readInt();
        this.vertindex = file.readInt();
        this.flexpair = file.readInt();
        this.vertanimtype = file.readInt();
        file.readByteArray(3); // unusedchar
        file.readIntArray(6); // unused
    }
}

export default ReadFlex;
