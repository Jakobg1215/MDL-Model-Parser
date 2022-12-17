import type FileReader from '../FileReader';

class ReadVertAnimation {
    public readonly index: number;
    public readonly speed: number;
    public readonly side: number;
    public readonly delta: [number, number, number];
    public readonly ndelta: [number, number, number];

    public constructor(file: FileReader) {
        this.index = file.readInt();
        this.speed = file.readFloat();
        this.side = file.readFloat();
        this.delta = file.readShortArray(3) as any;
        this.ndelta = file.readShortArray(3) as any;
    }
}

export default ReadVertAnimation;
