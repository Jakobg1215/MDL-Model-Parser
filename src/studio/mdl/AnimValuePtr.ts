import type FileReader from '../../utilities/FileReader.ts';

class AnimValuePtr {
    public readonly offset: number[];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.offset = file.readShortArray(3);
    }
}

export default AnimValuePtr;
