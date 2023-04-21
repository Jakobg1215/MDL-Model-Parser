import type FileReader from '../../utilities/FileReader.ts';

class Header2 {
    public readonly numsrcbonetransform: number;
    public readonly srcbonetransformindex: number;
    public readonly illumpositionattachmentindex: number;
    public readonly flMaxEyeDeflection: number;
    public readonly linearboneindex: number;
    public readonly sznameindex: string;
    public readonly m_nBoneFlexDriverCount: number;
    public readonly m_nBoneFlexDriverIndex: number;
    public readonly reserved: number[];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.numsrcbonetransform = file.readInt();
        this.srcbonetransformindex = file.readInt();
        this.illumpositionattachmentindex = file.readInt();
        this.flMaxEyeDeflection = file.readFloat();
        this.linearboneindex = file.readInt();
        this.sznameindex = file.readZeroTerminatedString(fileStart);
        this.m_nBoneFlexDriverCount = file.readInt();
        this.m_nBoneFlexDriverIndex = file.readInt();
        this.reserved = file.readIntArray(56);
    }
}

export default Header2;
