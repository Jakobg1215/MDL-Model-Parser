import type FileReader from '../../utilities/FileReader.ts';

import Hitbox from './Hitbox.ts';

class HitboxSet {
    public readonly sznameindex: string;
    public readonly numhitboxes: number;
    public readonly hitboxindex: number;

    public readonly hitboxes: Hitbox[] = [];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.sznameindex = file.readZeroTerminatedString(fileStart);
        this.numhitboxes = file.readInt();
        this.hitboxindex = file.readInt();
    }
}

export default HitboxSet;
