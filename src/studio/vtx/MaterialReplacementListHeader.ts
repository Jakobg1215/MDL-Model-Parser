import type FileReader from '../../utilities/FileReader.ts';

import type MaterialReplacementHeader from './MaterialReplacementHeader.ts';

class MaterialReplacementListHeader {
    public readonly numReplacements: number;
    public readonly replacementOffset: number;

    public readonly materialReplacements: MaterialReplacementHeader[] = [];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.numReplacements = file.readInt();
        this.replacementOffset = file.readInt();
    }
}

export default MaterialReplacementListHeader;
