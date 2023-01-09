import type FileReader from '../FileReader';
import type Vector3 from '../Vector3';

class ReadHitbox {
    // Size of 68 bytes
    public readonly bone: number;
    public readonly group: number;
    public readonly bbmin: Vector3;
    public readonly bbmax: Vector3;
    public readonly szhitboxnameindex: string;

    public constructor(file: FileReader) {
        this.bone = file.readInt();
        this.group = file.readInt();
        this.bbmin = file.readVector3();
        this.bbmax = file.readVector3();
        this.szhitboxnameindex = file.readStringZeroTerminated();;
        file.readIntArray(8); // unused
    }
}

export default ReadHitbox;
