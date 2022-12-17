import type FileReader from '../FileReader';
import type Vector3 from '../Vector3';
import type Vector4 from '../Vector4';

class ReadIKError {
    public readonly pos: Vector3;
    public readonly q: Vector4;

    public constructor(file: FileReader) {
        this.pos = file.readVector3();
        this.q = file.readVector4();
    }
}

export default ReadIKError;
