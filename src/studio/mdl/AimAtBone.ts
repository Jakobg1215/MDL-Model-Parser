import type Vector3 from '../../mathematics/Vector3.ts';
import type FileReader from '../../utilities/FileReader.ts';

class AimAtBone {
    public readonly parent: number;
    public readonly aim: number;
    public readonly aimvector: Vector3;
    public readonly upvector: Vector3;
    public readonly basepos: Vector3;

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.parent = file.readInt();
        this.aim = file.readInt();
        this.aimvector = file.readVector3();
        this.upvector = file.readVector3();
        this.basepos = file.readVector3();
    }
}

export default AimAtBone;
