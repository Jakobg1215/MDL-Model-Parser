import FileReader from '../FileReader';
import ReadMaterialReplacementHeader from './ReadMaterialReplacementHeader';

class ReadMaterialReplacementListHeader {
    public readonly numReplacements: number;
    public readonly replacementOffset: number;

    public readonly materialReplacements: ReadMaterialReplacementHeader[] = [];

    public constructor(file: FileReader) {
        this.numReplacements = file.readInt();
        this.replacementOffset = file.readInt();

        for (let materialReplacementReader = 0; materialReplacementReader < this.numReplacements; materialReplacementReader++) {
            file.setOffset(this.replacementOffset + materialReplacementReader * 6);
            this.materialReplacements.push(new ReadMaterialReplacementHeader(file));
        }
    }
}

export default ReadMaterialReplacementListHeader;
