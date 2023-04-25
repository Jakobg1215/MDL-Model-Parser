import type FileReader from '../../utilities/FileReader.ts';

class ModelVertexData {
    public readonly pVertexData: number;
    public readonly pTangentData: number;

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.pVertexData = file.readInt();
        this.pTangentData = file.readInt();
    }
}

export default ModelVertexData;
