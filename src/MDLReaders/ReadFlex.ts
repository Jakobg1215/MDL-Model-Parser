import type FileReader from '../FileReader';
import ReadVertexAnimation from './ReadVertexAnimation';

class ReadFlex {
    // Size of 63 bytes
    public readonly flexdesc: number;
    public readonly target0: number;
    public readonly target1: number;
    public readonly target2: number;
    public readonly target3: number;
    public readonly numverts: number;
    public readonly vertindex: number;
    public readonly flexpair: number;
    public readonly vertanimtype: number;

    public readonly verticesAnimations: ReadVertexAnimation[] = [];

    public constructor(file: FileReader) {
        this.flexdesc = file.readInt();
        this.target0 = file.readFloat();
        this.target1 = file.readFloat();
        this.target2 = file.readFloat();
        this.target3 = file.readFloat();
        this.numverts = file.readInt();
        this.vertindex = file.readInt();
        this.flexpair = file.readInt();
        this.vertanimtype = file.readInt();
        file.readByteArray(3); // unusedchar
        file.readIntArray(6); // unused

        // for (let vertexAnimationReader = 0; vertexAnimationReader < this.numverts; vertexAnimationReader++) {
        //     file.setOffset(this.vertindex + vertexAnimationReader * 16);
        //     this.verticesAnimations.push(new ReadVertexAnimation(file));
        // }
    }
}

export default ReadFlex;
