import type FileReader from '../FileReader';
import type Vector4 from '../Vector4';

class ReadAttachment {
    // Size of 92 bytes
    public readonly sznameindex: string;
    public readonly flags: number;
    public readonly localbone: number;
    public readonly local: [Vector4, Vector4, Vector4];

    public constructor(file: FileReader) {
        this.sznameindex = file.readStringZeroTerminated();
        this.flags = file.readInt();
        this.localbone = file.readInt();
        this.local = file.readVector4Array(3) as any;
        file.readIntArray(8); // unused
    }
}

export default ReadAttachment;
