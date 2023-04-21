import type FileReader from '../../utilities/FileReader.ts';

import type ModelHeader from './ModelHeader.ts';

class BodyPartHeader {
    public readonly numModels: number;
    public readonly modelOffset: number;

    public readonly models: ModelHeader[] = [];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.numModels = file.readInt();
        this.modelOffset = file.readInt();
    }
}

export default BodyPartHeader;
