import type Vector3 from '../../mathematics/Vector3.ts';
import type Vector4 from '../../mathematics/Vector4.ts';
import type FileReader from '../../utilities/FileReader.ts';

import AimAtBone from './AimAtBone.ts';
import AxisInterpBone from './AxisInterpBone.ts';
import JiggleBone from './JiggleBone.ts';
import QuatInterpBone from './QuatInterpBone.ts';

class Bone {
    public readonly sznameindex: string;
    public readonly parent: number;
    public readonly bonecontroller: number[];
    public readonly pos: Vector3;
    public readonly quat: Vector4;
    public readonly rot: Vector3;
    public readonly posscale: Vector3;
    public readonly rotscale: Vector3;
    public readonly poseToBone: Vector4[];
    public readonly qAlignment: Vector4;
    public readonly flags: number;
    public readonly proctype: number;
    public readonly procindex: number;
    public readonly physicsbone: number;
    public readonly surfacepropidx: number;
    public readonly contents: number;
    public readonly unused: number[];

    public procBone: null | AxisInterpBone | QuatInterpBone | AimAtBone | JiggleBone = null;

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.sznameindex = file.readZeroTerminatedString(fileStart);
        this.parent = file.readInt();
        this.bonecontroller = file.readIntArray(6);
        this.pos = file.readVector3();
        this.quat = file.readVector4();
        this.rot = file.readVector3();
        this.posscale = file.readVector3();
        this.rotscale = file.readVector3();
        this.poseToBone = [file.readVector4(), file.readVector4(), file.readVector4()];
        this.qAlignment = file.readVector4();
        this.flags = file.readInt();
        this.proctype = file.readInt();
        this.procindex = file.readInt();
        this.physicsbone = file.readInt();
        this.surfacepropidx = file.readInt();
        this.contents = file.readInt();
        this.unused = file.readIntArray(8);
    }
}

export default Bone;
