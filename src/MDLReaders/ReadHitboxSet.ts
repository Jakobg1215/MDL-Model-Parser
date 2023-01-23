import type FileReader from '../FileReader';
import ReadHitbox from './ReadHitbox';

class ReadHitboxSet {
    // Size of 12 bytes
    public readonly sznameindex: string;
    public readonly numhitboxes: number;
    public readonly hitboxindex: number;

    public readonly hitboxes: ReadHitbox[] = [];

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.sznameindex = file.readStringZeroTerminated(index);
        this.numhitboxes = file.readInt();
        this.hitboxindex = file.readInt();

        for (let hitboxReader = 0; hitboxReader < this.numhitboxes; hitboxReader++) {
            file.setOffset(index + this.hitboxindex + hitboxReader * 68);
            this.hitboxes.push(new ReadHitbox(file));
        }
    }
}

export default ReadHitboxSet;
