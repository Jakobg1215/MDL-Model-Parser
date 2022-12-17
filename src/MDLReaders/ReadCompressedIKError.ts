import type FileReader from '../FileReader';

class ReadCompressedIKError {
    public readonly scale: [number, number, number, number, number, number];
    public readonly offset: [number, number, number, number, number, number];

    public constructor(file: FileReader) {
        this.scale = file.readFloatArray(6) as any;
        this.offset = file.readShortArray(6) as any;
    }
}

export default ReadCompressedIKError;
