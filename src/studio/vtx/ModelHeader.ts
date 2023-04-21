import type FileReader from '../../utilities/FileReader.ts';

import type ModelLOD from './ModelLODHeader.ts';

class ModelHeader {
    public readonly numLODs: number;
    public readonly lodOffset: number;

    public readonly modelLODs: ModelLOD[] = [];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.numLODs = file.readInt();
        this.lodOffset = file.readInt();
    }
}

export default ModelHeader;
