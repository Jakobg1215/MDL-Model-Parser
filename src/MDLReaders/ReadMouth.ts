import type FileReader from "../FileReader";
import type Vector3 from "../Vector3";

class ReadMouth {
    // Size of 20 bytes
    public readonly bone: number;
    public readonly forward: Vector3;
    public readonly flexdesc: number;

    public constructor(file: FileReader) {
        this.bone = file.readInt();
        this.forward = file.readVector3();
        this.flexdesc = file.readInt();
    }
}

export default ReadMouth;