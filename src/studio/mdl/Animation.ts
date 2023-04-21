import type FileReader from '../../utilities/FileReader.ts';

class Animation {
    public static readonly ANIM_RAWPOS = 0x01;
    public static readonly ANIM_RAWROT = 0x02;
    public static readonly ANIM_ANIMPOS = 0x04;
    public static readonly ANIM_ANIMROT = 0x08;
    public static readonly ANIM_RAWROT2 = 0x20;

    public readonly bone: number;
    public readonly flags: number;
    public readonly nextoffset: number;

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.bone = file.readUnsignedByte();
        this.flags = file.readUnsignedByte();
        this.nextoffset = file.readShort();
    }
}

export default Animation;
