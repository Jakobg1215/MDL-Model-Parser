import type FileReader from '../FileReader';
import type Vector3 from '../Vector3';
import ReadLegacySurfaceHeader from './ReadLegacySurfaceHeader';

class ReadSwapCompactSurfaceHeader {
    public readonly size: number;
    public readonly vphysicsID: number;
    public readonly version: number;
    public readonly modelType: number;
    public readonly surfaceSize: number;
    public readonly dragAxisAreas: Vector3;
    public readonly axisMapSize: number;

    public readonly surface: ReadLegacySurfaceHeader | null = null;

    public constructor(file: FileReader) {
        this.size = file.readInt();
        this.vphysicsID = file.readInt();
        this.version = file.readShort();
        this.modelType = file.readShort();
        this.surfaceSize = file.readInt();
        this.dragAxisAreas = file.readVector3();
        this.axisMapSize = file.readInt();

        if (this.vphysicsID !== 0x59485056) {
            this.surface = new ReadLegacySurfaceHeader(file);
        }

        file.setOffset(file.fileReadOffset + this.surfaceSize);
    }
}

export default ReadSwapCompactSurfaceHeader;
