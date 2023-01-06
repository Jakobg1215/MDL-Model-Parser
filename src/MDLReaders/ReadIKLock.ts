import type FileReader from "../FileReader";

class ReadIKLock {
    // Size of 32 bytes
    public readonly chain: number;
    public readonly flPosWeight: number;
	public readonly flLocalQWeight: number;
	public readonly flags: number;

    public constructor(file: FileReader) {
        this.chain = file.readInt();
        this.flPosWeight = file.readFloat();
        this.flLocalQWeight = file.readFloat();
        this.flags = file.readInt();
        file.readIntArray(4); // unused
    }
}

export default ReadIKLock;