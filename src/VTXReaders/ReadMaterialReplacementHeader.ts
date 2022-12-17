import type FileReader from '../FileReader';

class ReadMaterialReplacementHeader {
    public readonly materialID: number;
    public readonly replacementMaterialNameOffset: number;

    public constructor(file: FileReader) {
        this.materialID = file.readShort();
        this.replacementMaterialNameOffset = file.readInt();
    }
}

export default ReadMaterialReplacementHeader;
