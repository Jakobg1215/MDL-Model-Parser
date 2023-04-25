import type FileReader from '../../utilities/FileReader.ts';

class MeshVertexData {
    public readonly modelvertexdata: number;
    public readonly numLODVertexes: number[];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.modelvertexdata = file.readInt();
        this.numLODVertexes = file.readIntArray(8);
    }
}

export default MeshVertexData;
