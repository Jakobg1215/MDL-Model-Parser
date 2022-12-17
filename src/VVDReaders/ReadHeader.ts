import type FileReader from '../FileReader';

class ReadHeader {
    /**
     * This is an encoding of "IDSV". What does it mean?
     */
    public readonly id: number;

    /**
     * This is always 4.
     * What about other versions?
     */
    public readonly version: number;

    /**
     * This must be the same as the checksum in the MDL header.
     */
    public readonly checksum: number;

    /**
     * This is the number of LODs that the model uses.
     * This is used to get the root LOD.
     * Is there any other uses?
     */
    public readonly numLODs: number;

    /**
     * The amount of vertexes in each LOD.
     * This will always be 8 integers.
     */
    public readonly numLODVertexes: [number, number, number, number, number, number, number, number];

    /**
     * The size of the fixup table.
     */
    public readonly numFixups: number;

    /**
     * The index to of the start of the fixup table.
     */
    public readonly fixupTableStart: number;

    /**
     * The index to of the start of the vertex data.
     */
    public readonly vertexDataStart: number;

    /**
     * The index to of the start of the tangent data.
     */
    public readonly tangentDataStart: number;

    public constructor(file: FileReader) {
        // Size of 64 bytes
        this.id = file.readInt();
        this.version = file.readInt();
        this.checksum = file.readInt();
        this.numLODs = file.readInt();
        this.numLODVertexes = file.readIntArray(8) as any;
        this.numFixups = file.readInt();
        this.fixupTableStart = file.readInt();
        this.vertexDataStart = file.readInt();
        this.tangentDataStart = file.readInt();
    }
}

export default ReadHeader;
