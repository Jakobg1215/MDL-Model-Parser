import type FileReader from '../../utilities/FileReader.ts';

import type MeshHeader from './MeshHeader.ts';

class ModelLODHeader {
    public readonly numMeshes: number;
    public readonly meshOffset: number;
    public readonly switchPoint: number;

    public readonly meshes: MeshHeader[] = [];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.numMeshes = file.readInt();
        this.meshOffset = file.readInt();
        this.switchPoint = file.readFloat();
    }
}

export default ModelLODHeader;
