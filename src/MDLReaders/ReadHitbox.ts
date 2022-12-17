import type FileReader from '../FileReader';
import type Vector3 from '../Vector3';

class ReadHitbox {
    public readonly bone: number;
    public readonly group: number;
    public readonly bbmin: Vector3;
    public readonly bbmax: Vector3;
    public readonly szhitboxnameindex: number;

    public constructor(file: FileReader) {
        // Size of 68 bytes
        this.bone = file.readInt();
        this.group = file.readInt();
        this.bbmin = file.readVector3();
        this.bbmax = file.readVector3();
        this.szhitboxnameindex = file.readInt();
        file.readIntArray(8); // unused
    }
}

export default ReadHitbox;
