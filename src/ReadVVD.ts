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

        // The 4 extra bytes are for the extra uv map data for csgo.
        // Garry's Mod models have it to support csgo models.
        // For other games it doen't exist.
        // Need to test if gmod will load the model if the extra uv map data is not there.

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
