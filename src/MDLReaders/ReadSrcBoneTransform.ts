import type FileReader from '../FileReader';
import type Vector4 from '../Vector4';

class ReadSrcBoneTransform {
    // Size of 100 bytes
    public readonly sznameindex: string;
    public readonly pretransform: [Vector4, Vector4, Vector4];
    public readonly posttransform: [Vector4, Vector4, Vector4];

    public constructor(file: FileReader) {
        this.sznameindex = file.readStringZeroTerminated();
        this.pretransform = file.readVector4Array(3) as any;
        this.posttransform = file.readVector4Array(3) as any;
    }
}

export default ReadSrcBoneTransform;
