import type Vector3 from '../../mathematics/Vector3.ts';
import type Vector4 from '../../mathematics/Vector4.ts';
import type FileReader from '../../utilities/FileReader.ts';

class IKRule {
    public readonly index: number;
    public readonly type: number;
    public readonly chain: number;
    public readonly bone: number;
    public readonly slot: number;
    public readonly height: number;
    public readonly radius: number;
    public readonly floor: number;
    public readonly pos: Vector3;
    public readonly q: Vector4;
    public readonly compressedikerrorindex: number;
    public readonly unused2: number;
    public readonly iStart: number;
    public readonly ikerrorindex: number;
    public readonly start: number;
    public readonly peak: number;
    public readonly tail: number;
    public readonly end: number;
    public readonly unused3: number;
    public readonly contact: number;
    public readonly drop: number;
    public readonly top: number;
    public readonly unused6: number;
    public readonly unused7: number;
    public readonly unused8: number;
    public readonly szattachmentindex: number;
    public readonly unused: number[];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.index = file.readInt();
        this.type = file.readInt();
        this.chain = file.readInt();
        this.bone = file.readInt();
        this.slot = file.readInt();
        this.height = file.readFloat();
        this.radius = file.readFloat();
        this.floor = file.readFloat();
        this.pos = file.readVector3();
        this.q = file.readVector4();
        this.compressedikerrorindex = file.readInt();
        this.unused2 = file.readInt();
        this.iStart = file.readInt();
        this.ikerrorindex = file.readInt();
        this.start = file.readFloat();
        this.peak = file.readFloat();
        this.tail = file.readFloat();
        this.end = file.readFloat();
        this.unused3 = file.readFloat();
        this.contact = file.readFloat();
        this.drop = file.readFloat();
        this.top = file.readFloat();
        this.unused6 = file.readInt();
        this.unused7 = file.readInt();
        this.unused8 = file.readInt();
        this.szattachmentindex = file.readInt();
        this.unused = file.readIntArray(7);
    }
}

export default IKRule;
