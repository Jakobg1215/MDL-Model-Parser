import Vector2 from '../mathematics/Vector2.ts';
import Vector3 from '../mathematics/Vector3.ts';
import Vector4 from '../mathematics/Vector4.ts';
import type Logger from './Logger.ts';

class FileReader {
    private readonly data: DataView;
    private offset = 0;
    private count = 0;
    private readonly stringTable = new Map<number, string>();

    public constructor(buffer: Uint8Array) {
        this.data = new DataView(buffer.buffer);
    }

    public readByte(): number {
        const byte = this.data.getInt8(this.offset);

        this.offset += 1;
        this.count += 1;

        return byte;
    }

    public readUnsignedByte(): number {
        const byte = this.data.getUint8(this.offset);

        this.offset += 1;
        this.count += 1;

        return byte;
    }

    public readByteArray(length: number): number[] {
        const bytes = [];

        for (let readBytes = 0; readBytes < length; readBytes++) {
            bytes.push(this.readByte());
        }

        return bytes;
    }

    public readUnsignedByteArray(length: number): number[] {
        const bytes = [];

        for (let readBytes = 0; readBytes < length; readBytes++) {
            bytes.push(this.readUnsignedByte());
        }

        return bytes;
    }

    public readShort(): number {
        const short = this.data.getInt16(this.offset, true);

        this.offset += 2;
        this.count += 2;

        return short;
    }

    public readUnsignedShort(): number {
        const short = this.data.getUint16(this.offset, true);

        this.offset += 2;
        this.count += 2;

        return short;
    }

    public readShortArray(length: number): number[] {
        const shorts = [];

        for (let readShorts = 0; readShorts < length; readShorts++) {
            shorts.push(this.readShort());
        }

        return shorts;
    }

    public readUnsignedShortArray(length: number): number[] {
        const shorts = [];

        for (let readShorts = 0; readShorts < length; readShorts++) {
            shorts.push(this.readUnsignedShort());
        }

        return shorts;
    }

    public readInt(): number {
        const int = this.data.getInt32(this.offset, true);

        this.offset += 4;
        this.count += 4;

        return int;
    }

    public readUnsignedInt(): number {
        const int = this.data.getUint32(this.offset, true);

        this.offset += 4;
        this.count += 4;

        return int;
    }

    public readIntArray(length: number): number[] {
        const ints = [];

        for (let readInts = 0; readInts < length; readInts++) {
            ints.push(this.readInt());
        }

        return ints;
    }

    public readUnsignedIntArray(length: number): number[] {
        const ints = [];

        for (let readInts = 0; readInts < length; readInts++) {
            ints.push(this.readUnsignedInt());
        }

        return ints;
    }

    public readFloat(): number {
        const float = this.data.getFloat32(this.offset, true);

        this.offset += 4;
        this.count += 4;

        return float;
    }

    public readFloatArray(length: number): number[] {
        const floats = [];

        for (let readFloats = 0; readFloats < length; readFloats++) {
            floats.push(this.readFloat());
        }

        return floats;
    }

    public readVector2(): Vector2 {
        return new Vector2(this.readFloat(), this.readFloat());
    }

    public readVector3(): Vector3 {
        return new Vector3(this.readFloat(), this.readFloat(), this.readFloat());
    }

    public readVector4(): Vector4 {
        return new Vector4(this.readFloat(), this.readFloat(), this.readFloat(), this.readFloat());
    }

    public readQuaternion(): Vector4 {
        return this.readVector4();
    }

    public readString(length: number): string {
        const string = this.bytesToString(this.buffer.slice(this.offset, this.offset + length));

        this.offset += length;
        this.count += length;

        return string;
    }

    public readZeroTerminatedString(start: number): string {
        const offset = this.readInt() + start;

        if (offset === this.offset) {
            throw new Error(); // FIXME: Handle zero index properly
        }

        const stringTableCheck = this.stringTable.get(offset);

        if (stringTableCheck !== undefined) return stringTableCheck;

        const stringData = this.buffer.subarray(offset, this.buffer.indexOf(0, offset));
        const string = this.bytesToString(stringData);

        // this.count += stringData.length + 1; // TODO: Turn on when at the end of the file
        this.stringTable.set(offset, string);

        return string;
    }

    public alignment4(logger: Logger): void {
        const fileSize = this.offset;
        const remainder = Math.ceil(this.offset / 4) * 4 - this.offset;

        if (remainder === 0) return;

        this.readByteArray(remainder);
        logger.logStudioRead('Alignment4', fileSize, this.offset);
    }

    public alignment16(logger: Logger): void {
        const fileSize = this.offset;
        const remainder = Math.ceil(this.offset / 16) * 16 - this.offset;

        if (remainder === 0) return;

        this.readByteArray(remainder);
        logger.logStudioRead('Alignment16', fileSize, this.offset);
    }

    private bytesToString(bytes: Uint8Array): string {
        const textconveter = new TextDecoder('ascii');
        return textconveter.decode(bytes);
    }

    public setOffset(offset: number): void {
        this.offset = offset;
    }

    public get readOffset(): number {
        return this.offset;
    }

    public get readCount(): number {
        return this.count;
    }

    public get fileSize(): number {
        return this.data.byteLength;
    }

    private get buffer(): Uint8Array {
        return new Uint8Array(this.data.buffer);
    }
}

export default FileReader;
