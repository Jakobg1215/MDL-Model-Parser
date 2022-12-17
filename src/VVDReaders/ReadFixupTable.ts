import type FileReader from '../FileReader';

class ReadFixupTable {
    public readonly lod: number;
    public readonly sourceVertexID: number;
    public readonly numVertexes: number;

    public constructor(file: FileReader) {
        // Size of 12 bytes
        this.lod = file.readInt();
        this.sourceVertexID = file.readInt();
        this.numVertexes = file.readInt();
    }
}

export default ReadFixupTable;
