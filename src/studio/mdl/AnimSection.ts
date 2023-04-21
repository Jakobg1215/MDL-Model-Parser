import type FileReader from '../../utilities/FileReader.ts';

class AnimSection {
    public readonly animblock: number;
    public readonly animindex: number;

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.animblock = file.readInt();
        this.animindex = file.readInt();
    }
}

export default AnimSection;
