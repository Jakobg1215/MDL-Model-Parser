import FileReader from "../FileReader";
import type Vector3 from "../Vector3";

class ReadIkLink {
    // Size of 28 bytes
    public readonly bone: number;
    public readonly kneeDir: Vector3;

    public constructor(file: FileReader) {
        this.bone = file.readInt();
        this.kneeDir = file.readVector3()
        file.readVector3(); // unused0
    }

}

export default ReadIkLink;