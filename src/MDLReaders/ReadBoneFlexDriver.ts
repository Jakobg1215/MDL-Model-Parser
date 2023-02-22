import type FileReader from '../FileReader';
import ReadBoneFlexDriverControl from './ReadBoneFlexDriverControl';

class ReadBoneFlexDriver {
    public readonly m_nBoneIndex: number;
    public readonly m_nControlCount: number;
    public readonly m_nControlIndex: number;

    public readonly boneflexdrivercontrols: ReadBoneFlexDriverControl[] = [];

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.m_nBoneIndex = file.readInt();
        this.m_nControlCount = file.readInt();
        this.m_nControlIndex = file.readInt();

        file.readIntArray(3); // unused

        for (let boneflexdrivercontrolReader = 0; boneflexdrivercontrolReader < this.m_nControlCount; boneflexdrivercontrolReader++) {
            file.setOffset(index + this.m_nControlIndex * 16);
            this.boneflexdrivercontrols.push(new ReadBoneFlexDriverControl(file));
        }
    }
}

export default ReadBoneFlexDriver;
