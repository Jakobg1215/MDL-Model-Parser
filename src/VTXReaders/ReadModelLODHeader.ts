import type FileReader from '../FileReader';
import ReadMeshHeader from './ReadMeshHeader';

class ReadModelLODHeader {
    /**
     * The count of how many meshes there are.
     *
     * @todo Find if the limit can go past 256.
     */
    public readonly numMeshes: number;

    /**
     * The byte offset to start reading the meshes.
     */
    public readonly meshOffset: number;

    /**
     * The value for the lod to switch to diffrent lod.
     *
     * @todo Can this be diffent from what the other lods are?
     */
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
