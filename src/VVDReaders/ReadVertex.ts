import FileReader from '../FileReader';
import type Vector2 from '../Vector2';
import type Vector3 from '../Vector3';
import ReadBoneWeight from './ReadBoneWeight';

class ReadVertex {
    // Size of 32 bytes
    public readonly m_BoneWeights: ReadBoneWeight;
    public readonly m_vecPosition: Vector3;
    public readonly m_vecNormal: Vector3;
    public readonly m_vecTexCoord: Vector2;

    public constructor(file: FileReader) {
        this.m_BoneWeights = new ReadBoneWeight(file);
        this.m_vecPosition = file.readVector3();
        this.m_vecNormal = file.readVector3();
        this.m_vecTexCoord = file.readVector2();
    }
}

export default ReadVertex;
