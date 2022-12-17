import type FileReader from '../FileReader';

class ReadAnimationSections {
    public readonly animblock: number;
    public readonly animindex: number;

    public constructor(file: FileReader) {
        this.animblock = file.readInt();
        this.animindex = file.readInt();
    }
}

export default ReadAnimationSections;
