import type FileReader from '../FileReader';

class ReadMeshVertexData {
    // Size of 36 bytes
    public readonly modelvertexdata: number;
    public readonly numLODVertexes: [number, number, number, number, number, number, number, number];

    public constructor(file: FileReader) {
        this.modelvertexdata = file.readInt();
        this.numLODVertexes = file.readIntArray(8) as any;
    }
}

export default ReadMeshVertexData;
