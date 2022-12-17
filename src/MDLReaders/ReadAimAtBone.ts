import type FileReader from '../FileReader';
import type Vector3 from '../Vector3';

class ReadAimAtBone {
    // Size of 44 bytes
    public readonly parent: number;
    public readonly aim: number;
    public readonly aimvector: Vector3;
    public readonly upvector: Vector3;
    public readonly basepos: Vector3;

    public constructor(file: FileReader) {
        this.parent = file.readInt();
        this.aim = file.readInt();
        this.aimvector = file.readVector3();
        this.upvector = file.readVector3();
        this.basepos = file.readVector3();
    }
}

export default ReadAimAtBone;
