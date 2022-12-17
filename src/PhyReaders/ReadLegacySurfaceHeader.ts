import type FileReader from '../FileReader';
import type Vector3 from '../Vector3';

class ReadLegacySurfaceHeader {
    public readonly size: number;
    public readonly mass_center: Vector3;
    public readonly rotation_inertia: Vector3;
    public readonly upper_limit_radius: number;
    public readonly bf: number;
    public readonly offset_ledgetree_root: number;
    public readonly dummy: [number, number, number];

    public constructor(file: FileReader) {
        this.size = file.readInt();
        this.mass_center = file.readVector3();
        this.rotation_inertia = file.readVector3();
        this.upper_limit_radius = file.readFloat();
        this.bf = file.readInt();
        this.offset_ledgetree_root = file.readInt();
        this.dummy = file.readIntArray(3) as any;
    }
}

export default ReadLegacySurfaceHeader;
