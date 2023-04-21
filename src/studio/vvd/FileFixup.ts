import type FileReader from '../../utilities/FileReader.ts';

class FileFixup {
    public readonly lod: number;
    public readonly sourceVertexID: number;
    public readonly numVertexes: number;

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.lod = file.readInt();
        this.sourceVertexID = file.readInt();
        this.numVertexes = file.readInt();
    }
}

export default FileFixup;
