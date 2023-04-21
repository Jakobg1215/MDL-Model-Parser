import type FileReader from '../../utilities/FileReader.ts';

class CompressedIKError {
    public readonly scale: number[];
    public readonly offset: number[];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.scale = file.readFloatArray(6);
        this.offset = file.readShortArray(6);
    }
}

export default CompressedIKError;
