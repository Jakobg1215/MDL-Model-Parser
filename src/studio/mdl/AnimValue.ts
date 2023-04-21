import type FileReader from '../../utilities/FileReader.ts';

class AnimValue {
    public readonly value: number;

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.value = file.readShort();
    }

    public get valid(): number {
        return this.value & 0x7fff;
    }

    public get total(): number {
        return this.value >> 8;
    }
}

export default AnimValue;
