import type Vector3 from '../../mathematics/Vector3.ts';
import type Vector4 from '../../mathematics/Vector4.ts';
import type FileReader from '../../utilities/FileReader.ts';

class IKError {
    public readonly pos: Vector3;
    public readonly q: Vector4;

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.pos = file.readVector3();
        this.q = file.readVector4();
    }
}

export default IKError;
