import type Vector4 from '../../mathematics/Vector4.ts';
import type FileReader from '../../utilities/FileReader.ts';

class Attachment {
    public readonly sznameindex: string;
    public readonly flags: number;
    public readonly localbone: number;
    public readonly local: Vector4[];
    public readonly unused: number[];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.sznameindex = file.readZeroTerminatedString(fileStart);
        this.flags = file.readUnsignedInt();
        this.localbone = file.readInt();
        this.local = [file.readVector4(), file.readVector4(), file.readVector4()];
        this.unused = file.readIntArray(8);
    }
}

export default Attachment;
