import type FileReader from '../utilities/FileReader.ts';

class Quaternion64 {
    public static fromFile(file: FileReader) {
        file.readUnsignedIntArray(2); // TODO: Save the data for decompilation.
    }
}

export default Quaternion64;
