import type FileReader from '../../utilities/FileReader.ts';

import type AnimSection from './AnimSection.ts';
import type IKRule from './IKRule.ts';
import type LocalHierarchy from './LocalHierarchy.ts';

class AnimationDescription {
    public readonly baseptr: number;
    public readonly sznameindex: string;
    public readonly fps: number;
    public readonly flags: number;
    public readonly numframes: number;
    public readonly nummovements: number;
    public readonly movementindex: number;
    public readonly unused1: number[];
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
    public readonly zeroframestalltime: number;

    public readonly sections: AnimSection[] = [];
    public readonly ikRules: IKRule[] = [];
    public readonly localHierarchy: LocalHierarchy[] = [];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.baseptr = file.readInt();
        this.sznameindex = file.readZeroTerminatedString(fileStart);
        this.fps = file.readFloat();
        this.flags = file.readInt();
        this.numframes = file.readInt();
        this.nummovements = file.readInt();
        this.movementindex = file.readInt();
        this.unused1 = file.readIntArray(6);
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
        this.zeroframestalltime = file.readFloat();
    }
}

export default AnimationDescription;
