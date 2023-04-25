import type FileReader from '../../utilities/FileReader.ts';
import Mesh from './Mesh.ts';
import ModelVertexData from './ModelVertexData.ts';

class Model {
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
    public readonly vertexdata: ModelVertexData;
    public readonly unused: number[];

    public readonly meshes: Mesh[] = [];

    public constructor(file: FileReader, public readonly fileStart: number) {
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
        this.vertexdata = new ModelVertexData(file, file.readOffset);
        this.unused = file.readIntArray(8);
    }
}

export default Model;
