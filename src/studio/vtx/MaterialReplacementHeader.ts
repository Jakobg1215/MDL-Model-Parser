import type FileReader from '../../utilities/FileReader.ts';

class MaterialReplacementHeader {
    public readonly materialID: number;
    public readonly replacementMaterialNameOffset: number;

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.materialID = file.readShort();
        this.replacementMaterialNameOffset = file.readInt();
    }
}

export default MaterialReplacementHeader;
