import type FileReader from '../FileReader';
import ReadAnimationSections from './ReadAnimationSections';
import ReadMovement from './ReadMovement';

class ReadAnimationDescription {
    // Size of 100 bytes
    public readonly baseptr: number;
    public readonly sznameindex: string;
    public readonly fps: number;
    public readonly flags: number;
    public readonly numframes: number;
    public readonly nummovements: number;
    public readonly movementindex: number;
    public readonly animblock: number;
    public readonly animindex: number;
    public readonly numikrules: number;
    public readonly ikruleindex: number;
    public readonly animblockikruleindex: number;
    public readonly numlocalhierarchy: number;
    public readonly localhierarchyindex: number;
    public readonly sectionindex: number;
    public readonly sectionframes: number;
    public readonly zeroframespan: number;
    public readonly zeroframecount: number;
    public readonly zeroframeindex: number;
    public readonly zeroframestall: number;

    public readonly movements: ReadMovement[] = [];
    public readonly animationSections: ReadAnimationSections[] = [];

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.baseptr = file.readInt();
        this.sznameindex = file.readStringZeroTerminated();
        this.fps = file.readFloat();
        this.flags = file.readInt();
        this.numframes = file.readInt();
        this.nummovements = file.readInt();
        this.movementindex = file.readInt();
        file.readIntArray(6); // unused1
        this.animblock = file.readInt();
        this.animindex = file.readInt();
        this.numikrules = file.readInt();
        this.ikruleindex = file.readInt();
        this.animblockikruleindex = file.readInt();
        this.numlocalhierarchy = file.readInt();
        this.localhierarchyindex = file.readInt();
        this.sectionindex = file.readInt();
        this.sectionframes = file.readInt();
        this.zeroframespan = file.readShort();
        this.zeroframecount = file.readShort();
        this.zeroframeindex = file.readInt();
        this.zeroframestall = file.readFloat();

        if (this.animblock !== -1) {
            let sectionframes = 0;
            if (this.sectionframes !== 0) {
                sectionframes = this.numframes / this.sectionframes + 2;
                for (let animSectionReader = 0; animSectionReader < sectionframes; animSectionReader++) {
                    file.setOffset(index + this.sectionindex + animSectionReader * 8);
                    this.animationSections.push(new ReadAnimationSections(file));
                }
            }

            if (this.animblock === 0) {
                if (sectionframes === 0) {
                }
            }
        }

        for (let movementReader = 0; movementReader < this.nummovements; movementReader++) {
            file.setOffset(index + this.movementindex + movementReader * 44);
            this.movements.push(new ReadMovement(file));
        }
    }
}

export default ReadAnimationDescription;
