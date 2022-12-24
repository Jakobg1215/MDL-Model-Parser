import type FileReader from '../FileReader';
import type Vector3 from '../Vector3';
import ReadFlex from './ReadFlex';
import ReadMeshVertexData from './ReadMeshVertexData';

class ReadMesh {
    // Size of 116 bytes
    public readonly material: number;
    public readonly modelindex: number;
    public readonly numvertices: number;
    public readonly vertexoffset: number;
    public readonly numflexes: number;
    public readonly flexindex: number;
    public readonly materialtype: number;
    public readonly materialparam: number;
    public readonly meshid: number;
    public readonly center: Vector3;
    public readonly vertexdata: ReadMeshVertexData;

    public readonly flexes: ReadFlex[] = [];

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.material = file.readInt();
        this.modelindex = file.readInt();
        this.numvertices = file.readInt();
        this.vertexoffset = file.readInt();
        this.numflexes = file.readInt();
        this.flexindex = file.readInt();
        this.materialtype = file.readInt();
        this.materialparam = file.readInt();
        this.meshid = file.readInt();
        this.center = file.readVector3();
        this.vertexdata = new ReadMeshVertexData(file);
        file.readIntArray(8); // unused

        for (let flexReader = 0; flexReader < this.numflexes; flexReader++) {
            file.setOffset(index + this.flexindex + flexReader * 63);
            this.flexes.push(new ReadFlex(file));
        }
    }
}

export default ReadMesh;
