import type FileReader from '../FileReader';

class ReadHeader2 {
    public readonly numsrcbonetransform: number;
    public readonly srcbonetransformindex: number;
    public readonly illumpositionattachmentindex: number;
    public readonly flMaxEyeDeflection: number;
    public readonly linearboneindex: number;
    public readonly sznameindex: string;
    public readonly m_nBoneFlexDriverCount: number;
    public readonly m_nBoneFlexDriverIndex: number;

    public constructor(file: FileReader) {
        this.numsrcbonetransform = file.readInt();
        this.srcbonetransformindex = file.readInt();
        this.illumpositionattachmentindex = file.readInt();
        this.flMaxEyeDeflection = file.readFloat();
        this.linearboneindex = file.readInt();
        this.sznameindex = file.readStringZeroTerminated();
        this.m_nBoneFlexDriverCount = file.readInt();
        this.m_nBoneFlexDriverIndex = file.readInt();
        file.readIntArray(56); // reserved
    }
}

export default ReadHeader2;
