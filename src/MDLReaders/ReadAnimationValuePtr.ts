import type FileReader from '../FileReader';

class ReadAnimationValuePtr {
    public readonly offset: [number, number, number];

    public constructor(file: FileReader) {
        this.offset = file.readShortArray(3) as any;
    }
}

export default ReadAnimationValuePtr;
