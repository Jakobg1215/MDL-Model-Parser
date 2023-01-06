import type FileReader from "../FileReader";
import ReadIkLink from "./ReadIkLink";

class ReadIKChain {
    // Size of 16 bytes
    public readonly sznameindex: number;
    public readonly linktype: number;
    public readonly numlinks: number;
    public readonly linkindex: number;

    public readonly links: ReadIkLink[] = [];

    public constructor(file: FileReader) {
        const index = file.fileReadOffset;
        this.sznameindex = file.readInt();
        this.linktype = file.readInt();
        this.numlinks = file.readInt();
        this.linkindex = file.readInt();

        for (let ikLinkReader = 0; ikLinkReader < this.numlinks; ikLinkReader++) {
            file.setOffset(index + this.linkindex + ikLinkReader * 28);
            this.links.push(new ReadIkLink(file));
        }
    }
}

export default ReadIKChain;