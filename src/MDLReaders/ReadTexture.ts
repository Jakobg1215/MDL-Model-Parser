import FileReader from "../FileReader";

class ReadTexture {
    // Size of 64 bytes
    public readonly sznameindex: number;
    public readonly flags: number; // Is this used?
    public readonly used: number; // Is this used?

    public constructor (file: FileReader) {
        this.sznameindex = file.readInt();
        this.flags = file.readInt();
        this.used = file.readInt();
        file.readInt(); // unused1
        file.readInt(); // material
        file.readInt(); // clientmaterial
        file.readIntArray(10); // unused
    }
}

export default ReadTexture;