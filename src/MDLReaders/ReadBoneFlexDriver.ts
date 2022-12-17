import type FileReader from '../FileReader';

class ReadBoneFlexDriver {
    public readonly m_nBoneIndex: number;
    public readonly m_nControlCount: number;
    public readonly m_nControlIndex: number;

    public constructor(file: FileReader) {
        this.m_nBoneIndex = file.readInt();
        this.m_nControlCount = file.readInt();
        this.m_nControlIndex = file.readFloat();

        file.readIntArray(3); // unused
    }
}

export default ReadBoneFlexDriver;
