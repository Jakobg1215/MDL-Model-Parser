import type FileReader from './FileReader';
import ReadBodyPartHeader from './VTXReaders/ReadBodyPartHeader';
import ReadHeader from './VTXReaders/ReadHeader';
import ReadMaterialReplacementListHeader from './VTXReaders/ReadMaterialReplacementListHeader';

class ReadVTX {
    public readonly header: ReadHeader;
    public readonly bodyParts: ReadBodyPartHeader[] = [];
    public readonly materialReplacementLists: ReadMaterialReplacementListHeader[] = [];

    public constructor(file: FileReader) {
        // From what is tested, all bytes will be read for all types of vtx files.
        // TODO: Add documentation to the what each of the classes.
        // Need to find what the diffence is between dx90, dx80, and sw.

        const fileSize = file.readableBytes.length;
        console.log('VTX File size: %d', fileSize);
        this.header = new ReadHeader(file);

        for (let bodyPartReader = 0; bodyPartReader < this.header.numBodyParts; bodyPartReader++) {
            file.setOffset(this.header.bodyPartOffset + bodyPartReader * 8);
            this.bodyParts.push(new ReadBodyPartHeader(file));
        }

        for (let materialReplacementListReader = 0; materialReplacementListReader < this.header.numLODs; materialReplacementListReader++) {
            file.setOffset(this.header.materialReplacementListOffset + materialReplacementListReader * 8);
            this.materialReplacementLists.push(new ReadMaterialReplacementListHeader(file));
        }

        console.log('VTX Read Bytes: %d, %d unread bytes', file.readByteCount, fileSize - file.readByteCount);
    }

    public toJSON(): string {
        return JSON.stringify({
            Header: this.header,
            'Body Parts': this.bodyParts,
            'Material Replacement Lists': this.materialReplacementLists,
        });
    }
}

export default ReadVTX;
