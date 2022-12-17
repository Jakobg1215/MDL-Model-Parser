import type FileReader from '../FileReader';

class ReadLinearBone {
    public readonly numbones: number;
    public readonly flagsindex: number;
    public readonly parentindex: number;
    public readonly posindex: number;
    public readonly quatindex: number;
    public readonly rotindex: number;
    public readonly posetoboneindex: number;
    public readonly posscaleindex: number;
    public readonly rotscaleindex: number;
    public readonly qalignmentindex: number;

    public constructor(file: FileReader) {
        this.numbones = file.readInt();
        this.flagsindex = file.readInt();
        this.parentindex = file.readInt();
        this.posindex = file.readInt();
        this.quatindex = file.readInt();
        this.rotindex = file.readInt();
        this.posetoboneindex = file.readInt();
        this.posscaleindex = file.readInt();
        this.rotscaleindex = file.readInt();
        this.qalignmentindex = file.readInt();
        file.readIntArray(6); // unused
    }
}

export default ReadLinearBone;
