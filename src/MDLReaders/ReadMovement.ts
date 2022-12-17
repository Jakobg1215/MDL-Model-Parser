import type FileReader from '../FileReader';
import type Vector3 from '../Vector3';

class ReadMovement {
    // Size of 44 bytes
    public readonly endframe: number;
    public readonly motionflags: number;
    public readonly v0: number;
    public readonly v1: number;
    public readonly angle: number;
    public readonly vector: Vector3;
    public readonly position: Vector3;

    public constructor(file: FileReader) {
        this.endframe = file.readInt();
        this.motionflags = file.readInt();
        this.v0 = file.readFloat();
        this.v1 = file.readFloat();
        this.angle = file.readFloat();
        this.vector = file.readVector3();
        this.position = file.readVector3();
    }
}

export default ReadMovement;
