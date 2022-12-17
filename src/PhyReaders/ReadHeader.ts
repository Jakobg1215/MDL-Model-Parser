import type FileReader from '../FileReader';

class ReadHeader {
    public readonly size: number;
    public readonly id: number;
    public readonly solidCount: number;
    public readonly checksum: number;

    public constructor(file: FileReader) {
        this.size = file.readInt();
        this.id = file.readInt();
        this.solidCount = file.readInt();
        this.checksum = file.readInt();
    }
}

export default ReadHeader;
