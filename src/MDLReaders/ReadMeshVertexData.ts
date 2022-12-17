import FileReader from '../FileReader';
import ReadModelVertexData from './ReadModelVertexData';

class ReadMeshVertexData {
    public readonly modelvertexdata: ReadModelVertexData;
    public readonly numLODVertexes: [number, number, number, number, number, number, number, number];

    public constructor(file: FileReader) {
        this.modelvertexdata = new ReadModelVertexData(file);
        this.numLODVertexes = file.readIntArray(8) as any;
    }
}

export default ReadMeshVertexData;
