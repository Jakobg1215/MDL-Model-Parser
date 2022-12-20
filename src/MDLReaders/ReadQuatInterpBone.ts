import type FileReader from '../FileReader';
import ReadQuatInterpInfo from './ReadQuatInterpInfo';

class ReadQuatInterpBone {
    // Size of 12 bytes
    public readonly control: number;
    public readonly numtriggers: number;
    public readonly triggerindex: number;

    public triggers: ReadQuatInterpInfo[] = [];

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.control = file.readInt();
        this.numtriggers = file.readInt();
        this.triggerindex = file.readInt();

        for (let triggerReader = 0; triggerReader < this.numtriggers; triggerReader++) {
            file.setOffset(index + this.triggerindex + triggerReader * 48);
            this.triggers.push(new ReadQuatInterpInfo(file));
        }
    }
}

export default ReadQuatInterpBone;
