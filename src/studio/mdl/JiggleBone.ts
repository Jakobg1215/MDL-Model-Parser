import type FileReader from '../../utilities/FileReader.ts';

class JiggleBone {
    public readonly flags: number;
    public readonly length: number;
    public readonly tipMass: number;
    public readonly yawStiffness: number;
    public readonly yawDamping: number;
    public readonly pitchStiffness: number;
    public readonly pitchDamping: number;
    public readonly alongStiffness: number;
    public readonly alongDamping: number;
    public readonly angleLimit: number;
    public readonly minYaw: number;
    public readonly maxYaw: number;
    public readonly yawFriction: number;
    public readonly yawBounce: number;
    public readonly minPitch: number;
    public readonly maxPitch: number;
    public readonly pitchFriction: number;
    public readonly pitchBounce: number;
    public readonly baseMass: number;
    public readonly baseStiffness: number;
    public readonly baseDamping: number;
    public readonly baseMinLeft: number;
    public readonly baseMaxLeft: number;
    public readonly baseLeftFriction: number;
    public readonly baseMinUp: number;
    public readonly baseMaxUp: number;
    public readonly baseUpFriction: number;
    public readonly baseMinForward: number;
    public readonly baseMaxForward: number;
    public readonly baseForwardFriction: number;
    public readonly boingImpactSpeed: number;
    public readonly boingImpactAngle: number;
    public readonly boingDampingRate: number;
    public readonly boingFrequency: number;
    public readonly boingAmplitude: number;

    public constructor(file: FileReader, public readonly fileStart: number) {
        this.flags = file.readInt();
        this.length = file.readFloat();
        this.tipMass = file.readFloat();
        this.yawStiffness = file.readFloat();
        this.yawDamping = file.readFloat();
        this.pitchStiffness = file.readFloat();
        this.pitchDamping = file.readFloat();
        this.alongStiffness = file.readFloat();
        this.alongDamping = file.readFloat();
        this.angleLimit = file.readFloat();
        this.minYaw = file.readFloat();
        this.maxYaw = file.readFloat();
        this.yawFriction = file.readFloat();
        this.yawBounce = file.readFloat();
        this.minPitch = file.readFloat();
        this.maxPitch = file.readFloat();
        this.pitchFriction = file.readFloat();
        this.pitchBounce = file.readFloat();
        this.baseMass = file.readFloat();
        this.baseStiffness = file.readFloat();
        this.baseDamping = file.readFloat();
        this.baseMinLeft = file.readFloat();
        this.baseMaxLeft = file.readFloat();
        this.baseLeftFriction = file.readFloat();
        this.baseMinUp = file.readFloat();
        this.baseMaxUp = file.readFloat();
        this.baseUpFriction = file.readFloat();
        this.baseMinForward = file.readFloat();
        this.baseMaxForward = file.readFloat();
        this.baseForwardFriction = file.readFloat();
        this.boingImpactSpeed = file.readFloat();
        this.boingImpactAngle = file.readFloat();
        this.boingDampingRate = file.readFloat();
        this.boingFrequency = file.readFloat();
        this.boingAmplitude = file.readFloat();
    }
}

export default JiggleBone;
