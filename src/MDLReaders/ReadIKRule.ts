import type FileReader from '../FileReader';
import type Vector3 from '../Vector3';
import type Vector4 from '../Vector4';

class ReadIKRule {
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
    public readonly iStart: number;
    public readonly ikerrorindex: number;
    public readonly start: number;
    public readonly peak: number;
    public readonly tail: number;
    public readonly end: number;
    public readonly contact: number;
    public readonly drop: number;
    public readonly top: number;
    public readonly szattachmentindex: number;

    public constructor(file: FileReader) {
        // Size of 152 bytes
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
        file.readInt(); // unused2
        this.iStart = file.readInt();
        this.ikerrorindex = file.readInt();
        this.start = file.readFloat();
        this.peak = file.readFloat();
        this.tail = file.readFloat();
        this.end = file.readFloat();
        file.readFloat(); // unused3
        this.contact = file.readFloat();
        this.drop = file.readFloat();
        this.top = file.readFloat();
        file.readInt(); // unused6
        file.readInt(); // unused7
        file.readInt(); // unused8
        this.szattachmentindex = file.readInt();
        file.readIntArray(7); // unused
    }
}

export default ReadIKRule;
