import type FileReader from '../FileReader';
import type Vector3 from '../Vector3';
import ReadAutoLayer from './ReadAutoLayer';
import ReadEvent from './ReadEvent';
import ReadIKLock from './ReadIKLock';

class ReadSequenceDescription {
    // Size of 212 bytes
    public readonly baseptr: number;
    public readonly szlabelindex: String;
    public readonly szactivitynameindex: String;
    public readonly flags: number;
    public readonly activity: number;
    public readonly actweight: number;
    public readonly numevents: number;
    public readonly eventindex: number;
    public readonly bbmin: Vector3;
    public readonly bbmax: Vector3;
    public readonly numblends: number;
    public readonly animindexindex: number;
    public readonly movementindex: number;
    public readonly groupsize: [number, number];
    public readonly paramindex: [number, number];
    public readonly paramstart: [number, number];
    public readonly paramend: [number, number];
    public readonly paramparent: number;
    public readonly fadeintime: number;
    public readonly fadeouttime: number;
    public readonly localentrynode: number;
    public readonly localexitnode: number;
    public readonly nodeflags: number;
    public readonly entryphase: number;
    public readonly exitphase: number;
    public readonly lastframe: number;
    public readonly nextseq: number;
    public readonly pose: number;
    public readonly numikrules: number;
    public readonly numautolayers: number;
    public readonly autolayerindex: number;
    public readonly weightlistindex: number;
    public readonly posekeyindex: number;
    public readonly numiklocks: number;
    public readonly iklockindex: number;
    public readonly keyvalueindex: number;
    public readonly keyvaluesize: number;
    public readonly cycleposeindex: number;
    public readonly activitymodifierindex: number;
    public readonly numactivitymodifiers: number;

    public readonly poseKeys: number[] = [];
    public readonly events: ReadEvent[] = [];
    public readonly autoLayers: ReadAutoLayer[] = [];
    public readonly weights: number[] = [];
    public readonly ikLocks: ReadIKLock[] = [];
    public readonly animationIndices: number[] = [];

    public constructor(file: FileReader, boneCount: number) {
        const index = file.fileReadOffset;
        this.baseptr = file.readInt();
        this.szlabelindex = file.readStringZeroTerminated();
        this.szactivitynameindex = file.readStringZeroTerminated();
        this.flags = file.readInt();
        this.activity = file.readInt();
        this.actweight = file.readInt();
        this.numevents = file.readInt();
        this.eventindex = file.readInt();
        this.bbmin = file.readVector3();
        this.bbmax = file.readVector3();
        this.numblends = file.readInt();
        this.animindexindex = file.readInt();
        this.movementindex = file.readInt();
        this.groupsize = file.readIntArray(2) as any;
        this.paramindex = file.readIntArray(2) as any;
        this.paramstart = file.readFloatArray(2) as any;
        this.paramend = file.readFloatArray(2) as any;
        this.paramparent = file.readInt();
        this.fadeintime = file.readFloat();
        this.fadeouttime = file.readFloat();
        this.localentrynode = file.readInt();
        this.localexitnode = file.readInt();
        this.nodeflags = file.readInt();
        this.entryphase = file.readFloat();
        this.exitphase = file.readFloat();
        this.lastframe = file.readFloat();
        this.nextseq = file.readInt();
        this.pose = file.readInt();
        this.numikrules = file.readInt();
        this.numautolayers = file.readInt();
        this.autolayerindex = file.readInt();
        this.weightlistindex = file.readInt();
        this.posekeyindex = file.readInt();
        this.numiklocks = file.readInt();
        this.iklockindex = file.readInt();
        this.keyvalueindex = file.readInt();
        this.keyvaluesize = file.readInt();
        this.cycleposeindex = file.readInt();
        this.activitymodifierindex = file.readInt();
        this.numactivitymodifiers = file.readInt();
        file.readIntArray(5); // unused

        if (this.groupsize[0] > 1 || this.groupsize[1] > 1) {
            file.setOffset(index + this.posekeyindex);
            this.poseKeys = file.readFloatArray(this.groupsize[0] + this.groupsize[1]);
        }

        for (let eventsReader = 0; eventsReader < this.numevents; eventsReader++) {
            file.setOffset(index + this.eventindex + eventsReader * 80);
            this.events.push(new ReadEvent(file));
        }

        for (let autoLayersReader = 0; autoLayersReader < this.numautolayers; autoLayersReader++) {
            file.setOffset(index + this.autolayerindex + autoLayersReader * 24);
            this.autoLayers.push(new ReadAutoLayer(file));
        }

        file.setOffset(index + this.weightlistindex);
        this.weights = file.readFloatArray(boneCount);

        for (let ikLocksReader = 0; ikLocksReader < this.numiklocks; ikLocksReader++) {
            file.setOffset(index + this.iklockindex + ikLocksReader * 32);
            this.ikLocks.push(new ReadIKLock(file));
        }

        file.setOffset(index + this.animindexindex);
        this.animationIndices = file.readIntArray(this.groupsize[0] * this.groupsize[1]);

        // TODO: Add support for keyvalues
    }
}

export default ReadSequenceDescription;
