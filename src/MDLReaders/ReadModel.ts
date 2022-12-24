import type FileReader from '../FileReader';
import ReadEyeball from './ReadEyeball';
import ReadMesh from './ReadMesh';
import ReadModelVertexData from './ReadModelVertexData';

class ReadModel {
    // Size of 148 bytes
    public readonly name: string;
    public readonly type: number;
    public readonly boundingradius: number;
    public readonly nummeshes: number;
    public readonly meshindex: number;
    public readonly numvertices: number;
    public readonly vertexindex: number;
    public readonly tangentsindex: number;
    public readonly numattachments: number;
    public readonly attachmentindex: number;
    public readonly numeyeballs: number;
    public readonly eyeballindex: number;
    public readonly vertexdata: ReadModelVertexData;

    public readonly meshes: ReadMesh[] = [];
    public readonly eyeballs: ReadEyeball[] = [];

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.name = file.readString(64);
        this.type = file.readInt();
        this.boundingradius = file.readFloat();
        this.nummeshes = file.readInt();
        this.meshindex = file.readInt();
        this.numvertices = file.readInt();
        this.vertexindex = file.readInt();
        this.tangentsindex = file.readInt();
        this.numattachments = file.readInt();
        this.attachmentindex = file.readInt();
        this.numeyeballs = file.readInt();
        this.eyeballindex = file.readInt();
        this.vertexdata = new ReadModelVertexData(file);
        file.readIntArray(8); // unused

        for (let meshReader = 0; meshReader < this.nummeshes; meshReader++) {
            file.setOffset(index + this.meshindex + meshReader * 116);
            this.meshes.push(new ReadMesh(file));
        }

        for (let eyeballReader = 0; eyeballReader < this.numeyeballs; eyeballReader++) {
            file.setOffset(index + this.eyeballindex + eyeballReader * 172);
            this.eyeballs.push(new ReadEyeball(file));
        }
    }
}

export default ReadModel;
