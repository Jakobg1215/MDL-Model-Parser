import FileReader from '../FileReader';
import ReadFlexOP from './ReadFlexOP';

class ReadFlexRule {
    // Size of 12 bytes
    public readonly flex: number;
    public readonly numops: number;
    public readonly opindex: number;

    public readonly ops: ReadFlexOP[] = [];

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.flex = file.readInt();
        this.numops = file.readInt();
        this.opindex = file.readInt();

        for (let opReader = 0; opReader < this.numops; opReader++) {
            file.setOffset(index + this.opindex + opReader * 8);
            this.ops.push(new ReadFlexOP(file));
        }
    }
}

export default ReadFlexRule;
