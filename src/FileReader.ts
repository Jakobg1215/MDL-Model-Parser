import type { Buffer } from 'node:buffer';
import Vector2 from './Vector2';
import Vector3 from './Vector3';
import Vector4 from './Vector4';

class FileReader {
    private offset = 0;
    private readBytes = 0;

    public constructor(private fileData: Buffer) {}

    public readInt(): number {
        const value = this.fileData.readInt32LE(this.offset);
        this.offset += 4;
        this.readBytes += 4;
        return value;
    }

    public readFloat(): number {
        const value = Number(this.fileData.readFloatLE(this.offset));
        this.offset += 4;
        this.readBytes += 4;
        return value;
    }

    public readString(length: number): string {
        const value = this.fileData.toString('ascii', this.offset, this.offset + length);
        this.offset += length;
        this.readBytes += length;
        return value;
    }

    public readStringZeroTerminated(): any {
        const value = this.fileData.toString('ascii', this.offset, this.fileData.indexOf(0, this.offset));
        this.offset += value.length + 1;
        this.readBytes += value.length + 1;
        return value;
    }

    public readByte(): number {
        const value = this.fileData.readUInt8(this.offset);
        this.offset += 1;
        this.readBytes += 1;
        return value;
    }

    public readBoolean(): boolean {
        return !!this.readInt();
    }

    public readIntArray(length: number): number[] {
        const array: number[] = [];
        for (let arrayIndex = 0; arrayIndex < length; arrayIndex++) {
            array.push(this.readInt());
        }
        return array;
    }

    public readFloatArray(length: number): number[] {
        const array: number[] = [];
        for (let arrayIndex = 0; arrayIndex < length; arrayIndex++) {
            array.push(this.readFloat());
        }
        return array;
    }

    public readShortArray(length: number): number[] {
        const array: number[] = [];
        for (let arrayIndex = 0; arrayIndex < length; arrayIndex++) {
            array.push(this.readShort());
        }
        return array;
    }

    public readByteArray(length: number): number[] {
        const array: number[] = [];
        for (let arrayIndex = 0; arrayIndex < length; arrayIndex++) {
            array.push(this.readByte());
        }
        return array;
    }

    public readVector3Array(length: number): Vector3[] {
        const array: Vector3[] = [];
        for (let arrayIndex = 0; arrayIndex < length; arrayIndex++) {
            array.push(this.readVector3());
        }
        return array;
    }

    public readVector4Array(length: number): Vector4[] {
        const array: Vector4[] = [];
        for (let arrayIndex = 0; arrayIndex < length; arrayIndex++) {
            array.push(this.readVector4());
        }
        return array;
    }

    public readVector2(): Vector2 {
        const x = this.readFloat();
        const y = this.readFloat();
        return new Vector2(x, y);
    }

    public readVector3(): Vector3 {
        const x = this.readFloat();
        const y = this.readFloat();
        const z = this.readFloat();
        return new Vector3(x, y, z);
    }

    public readVector4(): Vector4 {
        const x = this.readFloat();
        const y = this.readFloat();
        const z = this.readFloat();
        const w = this.readFloat();
        return new Vector4(x, y, z, w);
    }

    public readShort(): number {
        const value = this.fileData.readInt16LE(this.offset);
        this.offset += 2;
        this.readBytes += 2;
        return value;
    }

    public get readableBytes(): Buffer {
        return this.fileData.subarray(this.offset);
    }

    public setOffset(offset: number): void {
        this.offset = offset;
    }

    public get fileReadOffset(): number {
        return this.offset;
    }

    public get readByteCount(): number {
        return this.readBytes;
    }

    public get bytes(): Buffer {
        return this.fileData;
    }
}

export default FileReader;
