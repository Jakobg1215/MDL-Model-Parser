import type FileReader from '../utilities/FileReader.ts';

class Quaternion48 {
    public static fromFile(file: FileReader) {
        file.readUnsignedShortArray(3); // TODO: Save the data for decompilation.
    }
}

export default Quaternion48;
