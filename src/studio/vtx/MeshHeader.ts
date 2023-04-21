import type FileReader from '../../utilities/FileReader.ts';

import StripGroupHeader from './StripGroupHeader.ts';

class MeshHeader {
    public readonly numStripGroups: number;
    public readonly stripGroupHeaderOffset: number;
    public readonly flags: number;

    public readonly stripGroups: StripGroupHeader[] = [];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.numStripGroups = file.readInt();
        this.stripGroupHeaderOffset = file.readInt();
        this.flags = file.readUnsignedByte();
    }
}

export default MeshHeader;
