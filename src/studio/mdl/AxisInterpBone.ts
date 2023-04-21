import type Vector3 from '../../mathematics/Vector3.ts';
import type Vector4 from '../../mathematics/Vector4.ts';
import type FileReader from '../../utilities/FileReader.ts';

class AxisInterpBone {
    public readonly control: number;
    public readonly axis: number;
    public readonly pos: Vector3[];
    public readonly quat: Vector4[];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.control = file.readInt();
        this.axis = file.readInt();
        this.pos = [file.readVector3(), file.readVector3(), file.readVector3(), file.readVector3(), file.readVector3(), file.readVector3()];
        this.quat = [file.readVector4(), file.readVector4(), file.readVector4(), file.readVector4(), file.readVector4(), file.readVector4()];
    }
}

export default AxisInterpBone;
