import type FileReader from '../FileReader';

class ReadBoneFlexDriverControl {
    public readonly m_nBoneComponent: number;
    public readonly m_nFlexControllerIndex: number;
    public readonly m_flMin: number;
    public readonly m_flMax: number;

    public constructor(file: FileReader) {
        this.m_nBoneComponent = file.readInt();
        this.m_nFlexControllerIndex = file.readInt();
        this.m_flMin = file.readFloat();
        this.m_flMax = file.readFloat();
    }
}

export default ReadBoneFlexDriverControl;
