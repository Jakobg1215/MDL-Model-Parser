import type FileReader from './FileReader';
import type Vector4 from './Vector4';
import ReadFixupTable from './VVDReaders/ReadFixupTable';
import ReadHeader from './VVDReaders/ReadHeader';
import ReadVertex from './VVDReaders/ReadVertex';

class ReadVVD {
    public readonly header: ReadHeader;
    public readonly fixupTables: ReadFixupTable[] = [];
    public readonly vertices: ReadVertex[] = [];
    public readonly tangents: Vector4[] = [];

    public constructor(file: FileReader) {
        const fileSize = file.readableBytes.length;
        console.log('VVD File size: %d', fileSize);
        this.header = new ReadHeader(file);

        for (let fixupTableReader = 0; fixupTableReader < this.header.numFixups; fixupTableReader++) {
            file.setOffset(this.header.fixupTableStart + fixupTableReader * 12);
            this.fixupTables.push(new ReadFixupTable(file));
        }

        // If the vvd file has a fixup table, it will come with 8 extra bytes at the end.
        // This needs to be looked into to check if its needeed for the file to be accepted or its just source weirdness.
        // Need to check if this is always the case, or if it is just with some files.

        for (let vertexReader = 0; vertexReader < this.header.numLODVertexes[0]; vertexReader++) {
            file.setOffset(this.header.vertexDataStart + vertexReader * 48);
            this.vertices.push(new ReadVertex(file));
        }

        for (let tangentReader = 0; tangentReader < this.header.numLODVertexes[0]; tangentReader++) {
            file.setOffset(this.header.tangentDataStart + tangentReader * 16);
            this.tangents.push(file.readVector4());
        }

        console.log('VVD Read Bytes: %d, %d unread bytes', file.readByteCount, fileSize - file.readByteCount);
    }

    public toJSON(): string {
        return JSON.stringify({
            Header: this.header,
            'Fixup Tables': this.fixupTables,
            Vertices: this.vertices,
            Tangents: this.tangents,
        });
    }
}

export default ReadVVD;
