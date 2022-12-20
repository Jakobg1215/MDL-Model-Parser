import type FileReader from '../FileReader';

class ReadFixupTable {
    // Size of 12 bytes
    public readonly lod: number;
    public readonly sourceVertexID: number;
    public readonly numVertexes: number;

    public constructor(file: FileReader) {
        this.lod = file.readInt();
        this.sourceVertexID = file.readInt();
        this.numVertexes = file.readInt();
    }
}

export default ReadFixupTable;
