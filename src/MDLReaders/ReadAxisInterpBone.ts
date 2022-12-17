import type FileReader from '../FileReader';
import type Vector3 from '../Vector3';
import type Vector4 from '../Vector4';

class ReadAxisInterpBone {
    // Size of 176 bytes
    public readonly control: number;
    public readonly axis: number;
    public readonly pos: [Vector3, Vector3, Vector3, Vector3, Vector3, Vector3];
    public readonly quat: [Vector4, Vector4, Vector4, Vector4, Vector4, Vector4];

    public constructor(file: FileReader) {
        this.control = file.readInt();
        this.axis = file.readInt();
        this.pos = file.readVector3Array(6) as any;
        this.quat = file.readVector4Array(6) as any;
    }
}

export default ReadAxisInterpBone;
