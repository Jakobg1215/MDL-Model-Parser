import type FileReader from '../../utilities/FileReader.ts';

import type StripHeader from './StripHeader.ts';
import type Vertex from './Vertex.ts';

class StripGroupHeader {
    public readonly numVerts: number;
    public readonly vertOffset: number;
    public readonly numIndices: number;
    public readonly indexOffset: number;
    public readonly numStrips: number;
    public readonly stripOffset: number;
    public readonly flags: number;
    public readonly numTopologyIndices: number | null = null;
    public readonly topologyOffset: number | null = null;

    public readonly vertices: Vertex[] = [];
    public readonly indices: number[] = [];
    public readonly strips: StripHeader[] = [];

    public constructor(file: FileReader, public readonly fileStart: number, public readonly hasTopology: boolean) {
        this.numVerts = file.readInt();
        this.vertOffset = file.readInt();
        this.numIndices = file.readInt();
        this.indexOffset = file.readInt();
        this.numStrips = file.readInt();
        this.stripOffset = file.readInt();
        this.flags = file.readUnsignedByte();

        if (hasTopology) {
            this.numTopologyIndices = file.readInt();
            this.topologyOffset = file.readInt();
        }
    }
}

export default StripGroupHeader;
