import type Vector3 from '../../mathematics/Vector3.ts';
import type FileReader from '../../utilities/FileReader.ts';

class Hitbox {
    public readonly bone: number;
    public readonly group: number;
    public readonly bbmin: Vector3;
    public readonly bbmax: Vector3;
    public readonly szhitboxnameindex: string;
    public readonly unused: number[];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.bone = file.readInt();
        this.group = file.readInt();
        this.bbmin = file.readVector3();
        this.bbmax = file.readVector3();
        this.szhitboxnameindex = file.readZeroTerminatedString(fileStart);
        this.unused = file.readIntArray(8);
    }
}

export default Hitbox;
