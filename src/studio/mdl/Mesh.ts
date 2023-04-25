import type Vector3 from '../../mathematics/Vector3.ts';
import type FileReader from '../../utilities/FileReader.ts';
import Flex from './Flex.ts';
import MeshVertexData from './MeshVertexData.ts';

class Mesh {
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
    public readonly vertexdata: MeshVertexData;
    public readonly unused: number[];

    public readonly flexes: Flex[] = [];

    public constructor(file: FileReader, public readonly fileStart: number) {
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
        this.vertexdata = new MeshVertexData(file, file.readOffset);
        this.unused = file.readIntArray(8);
    }
}

export default Mesh;
