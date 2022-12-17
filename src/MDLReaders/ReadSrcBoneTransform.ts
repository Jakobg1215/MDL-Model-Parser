import type FileReader from '../FileReader';
import type Vector4 from '../Vector4';

class ReadSrcBoneTransform {
    public readonly sznameindex: number;
    public readonly pretransform: [Vector4, Vector4, Vector4, Vector4];
    public readonly posttransform: [Vector4, Vector4, Vector4, Vector4];

    public constructor(file: FileReader) {
        this.sznameindex = file.readInt();
        this.pretransform = file.readVector4Array(4) as any;
        this.posttransform = file.readVector4Array(4) as any;
    }
}

export default ReadSrcBoneTransform;
