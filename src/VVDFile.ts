import Vector4 from './mathematics/Vector4.ts';
import FileFixup from './studio/vvd/FileFixup.ts';
import FileHeader from './studio/vvd/FileHeader.ts';
import Vertex from './studio/vvd/Vertex.ts';
import FileReader from './utilities/FileReader.ts';
import Logger from './utilities/Logger.ts';

class VVDFile {
    private readonly logger = new Logger('VVDFile');
    public readonly header: FileHeader;

    public readonly fixupTable: FileFixup[] = [];
    public readonly vertices: Vertex[] = [];
    public readonly tangents: Vector4[] = [];

    public constructor(private readonly file: FileReader) {
        this.header = new FileHeader(file, file.readOffset);
        this.logger.logStudioRead('FileHeader', this.header.fileStart, this.file.readOffset);

        this.readFixupTable();

        file.alignment16(this.logger);

        this.readVertices();

        this.readTangents();

        this.logger.logStudioRead('VVDFile', 0, this.file.readCount, this.file.fileSize);

        this.logger.close();
    }

    private readFixupTable(): void {
        this.file.setOffset(this.header.fixupTableStart);
        const fileSize = this.file.readOffset;

        for (let readFixupTable = 0; readFixupTable < this.header.numFixups; readFixupTable++) {
            const fixup = new FileFixup(this.file, this.file.readOffset);
            this.fixupTable.push(fixup);
        }
        this.logger.logStudioRead('FileFixup', fileSize, this.file.readOffset);
    }

    private readVertices(): void {
        this.file.setOffset(this.header.vertexDataStart);
        const fileSize = this.file.readOffset;

        for (let readVertices = 0; readVertices < this.header.numLODVertexes[0]; readVertices++) {
            const vertex = new Vertex(this.file, this.file.readOffset);
            this.vertices.push(vertex);
        }
        this.logger.logStudioRead('Vertex', fileSize, this.file.readOffset);
    }

    private readTangents(): void {
        this.file.setOffset(this.header.tangentDataStart);
        const fileSize = this.file.readOffset;

        for (let readTangents = 0; readTangents < this.header.numLODVertexes[0]; readTangents++) {
            const tangent = this.file.readVector4();
            this.tangents.push(tangent);
        }
        this.logger.logStudioRead('Tangents', fileSize, this.file.readOffset);
    }
}

export default VVDFile;
