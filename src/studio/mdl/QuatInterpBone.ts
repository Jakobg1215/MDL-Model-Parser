import type FileReader from '../../utilities/FileReader.ts';

import QuatInterpInfo from './QuatInterpInfo.ts';

class QuatInterpBone {
    public readonly control: number;
    public readonly numtriggers: number;
    public readonly triggerindex: number;

    public readonly triggers: QuatInterpInfo[] = [];

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.control = file.readInt();
        this.numtriggers = file.readInt();
        this.triggerindex = file.readInt();
    }
}

export default QuatInterpBone;
