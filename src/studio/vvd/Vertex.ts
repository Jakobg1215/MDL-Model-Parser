import type Vector2 from '../../mathematics/Vector2.ts';
import type Vector3 from '../../mathematics/Vector3.ts';
import type FileReader from '../../utilities/FileReader.ts';

import BoneWeight from './BoneWeight.ts';

class Vertex {
    public readonly m_BoneWeights: BoneWeight;
    public readonly m_vecPosition: Vector3;
    public readonly m_vecNormal: Vector3;
    public readonly m_vecTexCoord: Vector2;

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.m_BoneWeights = new BoneWeight(file, file.readOffset);
        this.m_vecPosition = file.readVector3();
        this.m_vecNormal = file.readVector3();
        this.m_vecTexCoord = file.readVector2();
    }
}

export default Vertex;
