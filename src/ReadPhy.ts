import type FileReader from './FileReader';
import ReadHeader from './PhyReaders/ReadHeader';
import ReadSwapCompactSurfaceHeader from './PhyReaders/ReadSwapCompactSurfaceHeader';

class ReadPhy {
    public readonly header: ReadHeader;
    public readonly solids: ReadSwapCompactSurfaceHeader[] = [];

    public constructor(file: FileReader) {
        const fileSize = file.readableBytes.length;
        console.log('PHY File size: %d', fileSize);
        this.header = new ReadHeader(file);

        file.setOffset(this.header.size);
        for (let solidReader = 0; solidReader < this.header.solidCount; solidReader++) {
            this.solids.push(new ReadSwapCompactSurfaceHeader(file));
        }

        console.log('PHY Read Bytes: %d, %d unread bytes', file.readByteCount, fileSize - file.readByteCount);

        // TODO: Finish reading the file
    }

    public toJSON(): string {
        return JSON.stringify({ Header: this.header, Solids: this.solids });
    }
}

export default ReadPhy;
