import type FileReader from '../FileReader';
import type Vector3 from '../Vector3';
import type Vector4 from '../Vector4';

class ReadQuatInterpInfo {
    // Size of 48 bytes
    public readonly inv_tolerance: number;
    public readonly trigger: Vector4;
    public readonly pos: Vector3;
    public readonly quat: Vector4;

    public constructor(file: FileReader) {
        this.inv_tolerance = file.readFloat();
        this.trigger = file.readVector4();
        this.pos = file.readVector3();
        this.quat = file.readVector4();
    }
}

export default ReadQuatInterpInfo;
