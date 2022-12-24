import type FileReader from '../FileReader';
import type Vector3 from '../Vector3';

class ReadEyeball {
    // Size of 172 bytes
    public readonly sznameindex: number;
    public readonly bone: number;
    public readonly org: Vector3;
    public readonly zoffset: number;
    public readonly radius: number;
    public readonly up: Vector3;
    public readonly forward: Vector3;
    public readonly texture: number;
    public readonly iris_scale: number;
    public readonly upperflexdesc: [number, number, number];
    public readonly lowerflexdesc: [number, number, number];
    public readonly uppertarget: [number, number, number];
    public readonly lowertarget: [number, number, number];
    public readonly upperlidflexdesc: number;
    public readonly lowerlidflexdesc: number;
    public readonly m_bNonFACS: boolean;

    public constructor(file: FileReader) {
        this.sznameindex = file.readInt();
        this.bone = file.readInt();
        this.org = file.readVector3();
        this.zoffset = file.readFloat();
        this.radius = file.readFloat();
        this.up = file.readVector3();
        this.forward = file.readVector3();
        this.texture = file.readInt();
        file.readInt(); // unused1
        this.iris_scale = file.readFloat();
        file.readInt(); // unused2
        this.upperflexdesc = file.readIntArray(3) as any;
        this.lowerflexdesc = file.readIntArray(3) as any;
        this.uppertarget = file.readFloatArray(3) as any;
        this.lowertarget = file.readFloatArray(3) as any;
        this.upperlidflexdesc = file.readInt();
        this.lowerlidflexdesc = file.readInt();
        file.readIntArray(4); // unused
        this.m_bNonFACS = file.readBoolean();
        file.readByteArray(3); // unused3
        file.readIntArray(7); // unused4
    }
}

export default ReadEyeball;
