import type FileReader from '../FileReader';
import ReadMeshHeader from './ReadMeshHeader';

class ReadModelLODHeader {
    public readonly numMeshes: number;
    public readonly meshOffset: number;
    public readonly switchPoint: number;

    public readonly meshes: ReadMeshHeader[] = [];

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.numMeshes = file.readInt();
        this.meshOffset = file.readInt();
        this.switchPoint = file.readFloat();

        for (let meshReader = 0; meshReader < this.numMeshes; meshReader++) {
            file.setOffset(index + this.meshOffset + meshReader * 9);
            this.meshes.push(new ReadMeshHeader(file));
        }
    }
}

export default ReadModelLODHeader;
