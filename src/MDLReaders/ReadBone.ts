import type FileReader from '../FileReader';
import type Vector3 from '../Vector3';
import type Vector4 from '../Vector4';
import ReadAimAtBone from './ReadAimAtBone';
import ReadAxisInterpBone from './ReadAxisInterpBone';
import ReadJiggleBone from './ReadJiggleBone';
import ReadQuatInterpBone from './ReadQuatInterpBone';

class ReadBone {
    // Size of 216 bytes
    public readonly sznameindex: string;
    public readonly parent: number;
    public readonly bonecontroller: [number, number, number, number, number, number];
    public readonly pos: Vector3;
    public readonly quat: Vector4;
    public readonly rot: Vector3;
    public readonly posscale: Vector3;
    public readonly rotscale: Vector3;
    public readonly poseToBone: [Vector4, Vector4, Vector4];
    public readonly qAlignment: Vector4;
    public readonly flags: number;
    public readonly proctype: number;
    public readonly procindex: number;
    public readonly physicsbone: number;
    public readonly surfacepropidx: number;
    public readonly contents: number;

    public readonly proceduralRule: null | ReadAxisInterpBone | ReadQuatInterpBone | ReadAimAtBone | ReadJiggleBone = null;

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.sznameindex = file.readStringZeroTerminated();
        this.parent = file.readInt();
        this.bonecontroller = file.readIntArray(6) as any;
        this.pos = file.readVector3();
        this.quat = file.readVector4();
        this.rot = file.readVector3();
        this.posscale = file.readVector3();
        this.rotscale = file.readVector3();
        this.poseToBone = file.readVector4Array(3) as any;
        this.qAlignment = file.readVector4();
        this.flags = file.readInt();
        this.proctype = file.readInt();
        this.procindex = file.readInt();
        this.physicsbone = file.readInt();
        this.surfacepropidx = file.readInt();
        this.contents = file.readInt();
        file.readIntArray(8); // unused

        if (this.procindex) {
            file.setOffset(index + this.procindex);
            switch (this.proctype) {
                case 1: {
                    this.proceduralRule = new ReadAxisInterpBone(file);
                    break;
                }

                case 2: {
                    this.proceduralRule = new ReadQuatInterpBone(file);
                    break;
                }

                case 3:
                case 4: {
                    this.proceduralRule = new ReadAimAtBone(file);
                    break;
                }

                case 5: {
                    this.proceduralRule = new ReadJiggleBone(file);
                    break;
                }
            }
        }
    }
}

export default ReadBone;
