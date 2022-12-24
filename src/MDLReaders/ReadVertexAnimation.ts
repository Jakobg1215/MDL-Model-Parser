import type FileReader from '../FileReader';

class ReadVertexAnimation {
    // Size of 16 bytes
    public readonly index: number;
    public readonly speed: number;
    public readonly side: number;
    public readonly delta: [number, number, number];
    public readonly ndelta: [number, number, number];

    public constructor(file: FileReader) {
        this.index = file.readShort();
        this.speed = file.readByte();
        this.side = file.readByte();
        this.delta = file.readShortArray(3) as any;
        this.ndelta = file.readShortArray(3) as any;
    }
}

export default ReadVertexAnimation;
