import type Vector3 from '../../mathematics/Vector3.ts';
import type Vector4 from '../../mathematics/Vector4.ts';
import type FileReader from '../../utilities/FileReader.ts';

class QuatInterpInfo {
    public readonly inv_tolerance: number;
    public readonly trigger: Vector4;
    public readonly pos: Vector3;
    public readonly quat: Vector4;

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.inv_tolerance = file.readFloat();
        this.trigger = file.readQuaternion();
        this.pos = file.readVector3();
        this.quat = file.readQuaternion();
    }
}

export default QuatInterpInfo;
