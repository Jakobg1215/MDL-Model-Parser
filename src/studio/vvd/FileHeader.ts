import type FileReader from '../../utilities/FileReader.ts';

class FileHeader {
    public readonly id: number;
    public readonly version: number;
    public readonly checksum: number;
    public readonly numLODs: number;
    public readonly numLODVertexes: number[];
    public readonly numFixups: number;
    public readonly fixupTableStart: number;
    public readonly vertexDataStart: number;
    public readonly tangentDataStart: number;

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.id = file.readInt();
        this.version = file.readInt();
        this.checksum = file.readInt();
        this.numLODs = file.readInt();
        this.numLODVertexes = file.readIntArray(8);
        this.numFixups = file.readInt();
        this.fixupTableStart = file.readInt();
        this.vertexDataStart = file.readInt();
        this.tangentDataStart = file.readInt();
    }
}

export default FileHeader;
