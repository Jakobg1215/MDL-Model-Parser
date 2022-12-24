import type FileReader from '../FileReader';

class ReadModelVertexData {
    // Size of 8 bytes
    public readonly pVertexData: number;
    public readonly pTangentData: number;

    public constructor(file: FileReader) {
        this.pVertexData = file.readInt();
        this.pTangentData = file.readInt();
    }
}

export default ReadModelVertexData;
