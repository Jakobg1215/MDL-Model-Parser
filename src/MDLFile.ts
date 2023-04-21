import Float16 from './mathematics/Float16.ts';
import Quaternion48 from './mathematics/Quaternion48.ts';
import Quaternion64 from './mathematics/Quaternion64.ts';
import AimAtBone from './studio/mdl/AimAtBone.ts';
import AnimSection from './studio/mdl/AnimSection.ts';
import Animation from './studio/mdl/Animation.ts';
import AnimationDescription from './studio/mdl/AnimationDescription.ts';
import Attachment from './studio/mdl/Attachment.ts';
import AxisInterpBone from './studio/mdl/AxisInterpBone.ts';
import Bone from './studio/mdl/Bone.ts';
import BoneController from './studio/mdl/BoneController.ts';
import Header from './studio/mdl/Header.ts';
import Header2 from './studio/mdl/Header2.ts';
import Hitbox from './studio/mdl/Hitbox.ts';
import HitboxSet from './studio/mdl/HitboxSet.ts';
import IKRule from './studio/mdl/IKRule.ts';
import JiggleBone from './studio/mdl/JiggleBone.ts';
import ProceduralBoneType from './studio/mdl/ProceduralBoneType.ts';
import QuatInterpBone from './studio/mdl/QuatInterpBone.ts';
import QuatInterpInfo from './studio/mdl/QuatInterpInfo.ts';
import SequenceDescription from './studio/mdl/SequenceDescription.ts';
import FileReader from './utilities/FileReader.ts';
import Logger from './utilities/Logger.ts';

class MDLFile {
    private readonly logger = new Logger('MDLFile');

    public readonly header: Header;
    public readonly header2: Header2;

    public readonly bones: Bone[] = [];
    public readonly boneControllers: BoneController[] = [];
    public readonly attachments: Attachment[] = [];
    public readonly hitboxSets: HitboxSet[] = [];
    public readonly boneTableByName: number[] = [];
    public readonly animations: AnimationDescription[] = [];
    public readonly sequences: SequenceDescription[] = [];

    public constructor(private readonly file: FileReader) {
        this.header = new Header(file, file.readOffset);
        this.logger.logStudioRead('FileHeader', this.header.fileStart, file.readOffset);

        file.setOffset(this.header.studiohdr2index);
        this.header2 = new Header2(file, file.readOffset);
        this.logger.logStudioRead('Header2', this.header2.fileStart, file.readOffset);

        file.setOffset(this.header.boneindex);
        for (let readBones = 0; readBones < this.header.numbones; readBones++) {
            this.bones.push(new Bone(file, file.readOffset));
        }
        this.logger.logStudioRead('Bones', this.header.boneindex, file.readOffset, this.header.numbones);

        this.readProceduralBones();

        file.setOffset(this.header.bonecontrollerindex);
        for (let readBoneControllers = 0; readBoneControllers < this.header.numbonecontrollers; readBoneControllers++) {
            this.boneControllers.push(new BoneController(file, file.readOffset));
        }
        this.logger.logStudioRead('BoneController', this.header.bonecontrollerindex, file.readOffset, this.header.numbonecontrollers);

        file.setOffset(this.header.localattachmentindex);
        for (let readAttachments = 0; readAttachments < this.header.numlocalattachments; readAttachments++) {
            this.attachments.push(new Attachment(file, file.readOffset));
        }
        this.logger.logStudioRead('Attachments', this.header.localattachmentindex, file.readOffset, this.header.numlocalattachments);

        file.setOffset(this.header.hitboxsetindex);
        for (let readHitboxSets = 0; readHitboxSets < this.header.numhitboxsets; readHitboxSets++) {
            this.hitboxSets.push(new HitboxSet(file, file.readOffset));
        }
        this.logger.logStudioRead('HitboxSets', this.header.hitboxsetindex, file.readOffset, this.header.numhitboxsets);

        this.readHitboxes();

        this.readBoneTableByName();
        file.alignment4(this.logger);

        file.setOffset(this.header.localanimindex);
        for (let readAnimations = 0; readAnimations < this.header.numlocalanim; readAnimations++) {
            this.animations.push(new AnimationDescription(file, file.readOffset));
        }
        this.logger.logStudioRead('AnimationDescriptions', this.header.localanimindex, file.readOffset, this.header.numlocalanim);

        this.readAnimations();

        file.setOffset(this.header.localseqindex);
        for (let readSequences = 0; readSequences < this.header.numlocalseq; readSequences++) {
            this.sequences.push(new SequenceDescription(file, file.readOffset));
        }

        this.readSequences();

        this.logger.logStudioRead('MDLFile', 0, file.readCount, file.fileSize);

        this.logger.close();
    }

    private readProceduralBones(): void {
        for (const bone of this.bones) {
            if (bone.procindex === 0) continue;

            this.file.setOffset(bone.fileStart + bone.procindex);
            switch (bone.proctype) {
                case ProceduralBoneType.AXISINTERP: {
                    bone.procBone = new AxisInterpBone(this.file, this.file.readOffset);
                    break;
                }

                case ProceduralBoneType.QUATINTERP: {
                    bone.procBone = new QuatInterpBone(this.file, this.file.readOffset);
                    break;
                }

                case ProceduralBoneType.AIMATBONE:
                case ProceduralBoneType.AIMATATTACH: {
                    bone.procBone = new AimAtBone(this.file, this.file.readOffset);
                    break;
                }

                case ProceduralBoneType.JIGGLE: {
                    bone.procBone = new JiggleBone(this.file, this.file.readOffset);
                    break;
                }
            }

            this.logger.logStudioRead('ProceduralBone', bone.fileStart + bone.procindex, this.file.readOffset);
        }

        for (const bone of this.bones) {
            if (bone.procindex === 0) continue;
            if (!(bone.procBone instanceof QuatInterpBone)) continue;

            this.readQuatInterpInfo(bone.procBone);
        }
    }

    private readQuatInterpInfo(quatbone: QuatInterpBone): void {
        this.file.setOffset(quatbone.fileStart + quatbone.triggerindex);
        for (let readTriggers = 0; readTriggers < quatbone.numtriggers; readTriggers++) {
            quatbone.triggers.push(new QuatInterpInfo(this.file, this.file.readOffset));
        }
        this.logger.logStudioRead('QuatInterpInfo', quatbone.fileStart + quatbone.triggerindex, this.file.readOffset, quatbone.numtriggers);
    }

    private readHitboxes(): void {
        const fileStart = this.file.readOffset;
        let hitboxCount = 0;
        for (const hitboxSet of this.hitboxSets) {
            this.file.setOffset(hitboxSet.fileStart + hitboxSet.hitboxindex);
            for (let readHitboxes = 0; readHitboxes < hitboxSet.numhitboxes; readHitboxes++) {
                hitboxSet.hitboxes.push(new Hitbox(this.file, this.file.readOffset));
                hitboxCount++;
            }
        }
        this.logger.logStudioRead('Hitboxes', fileStart, this.file.readOffset, hitboxCount);
    }

    private readBoneTableByName(): void {
        this.file.setOffset(this.header.bonetablebynameindex);
        this.boneTableByName.push(...this.file.readUnsignedByteArray(this.header.numbones));
        this.logger.logStudioRead('BoneTableByName', this.header.bonetablebynameindex, this.file.readOffset);
    }

    private readAnimations(): void {
        for (const animation of this.animations) {
            if (animation.animindex === -1) continue; // Out of date model format
            if (animation.animindex === 0) continue; // External data?

            const sections = [];
            const sectionCount = animation.sectionindex === 0 ? 0 : animation.numframes / animation.sectionframes + 2;

            this.file.setOffset(animation.fileStart + animation.sectionindex);
            for (let readSections = 0; readSections < sectionCount; readSections++) {
                sections.push(new AnimSection(this.file, this.file.readOffset));
            }

            if (sectionCount === 0) {
                this.file.setOffset(animation.fileStart + animation.animindex);
                this.readAnimationData();
            }
            for (const section of sections) {
                if (section.animblock !== 0) continue;
                this.file.setOffset(animation.fileStart + section.animindex);
                this.readAnimationData();
            }

            if (animation.ikruleindex) {
                this.file.setOffset(animation.fileStart + animation.ikruleindex);
                for (let readIkRules = 0; readIkRules < animation.numikrules; readIkRules++) {
                    animation.ikRules.push(new IKRule(this.file, this.file.readOffset));
                }
                // TODO: Read Ik Errors
            }

            if (animation.ikruleindex) {
                // TODO: Read loacal hierarchy
            }
        }
    }

    private readAnimationData(): void {
        let animation = new Animation(this.file, this.file.readOffset);

        if (animation.bone === 255) return; // No animation data

        while (true) {
            if (animation.flags & (Animation.ANIM_RAWROT | Animation.ANIM_RAWPOS | Animation.ANIM_RAWROT2)) {
                if (animation.flags & Animation.ANIM_RAWROT) {
                    Quaternion48.fromFile(this.file);
                }

                if (animation.flags & Animation.ANIM_RAWROT2) {
                    Quaternion64.fromFile(this.file);
                }

                if (animation.flags & Animation.ANIM_RAWPOS) {
                    Float16.fromFile(this.file);
                }
            } else {
                // TODO: Add reading for animating data
            }

            if (animation.nextoffset === 0) {
                this.file.setOffset(this.file.readOffset + 4);
                break;
            }

            this.file.setOffset(this.file.readOffset + animation.nextoffset);
            animation = new Animation(this.file, this.file.readOffset);
        }

        this.file.alignment4(this.logger);
    }

    private readSequences(): void {
        for (const sequence of this.sequences) {
            if (sequence.posekeyindex) {
                this.file.setOffset(sequence.fileStart + sequence.posekeyindex);
                this.file.readFloatArray(sequence.groupsize[0] + sequence.groupsize[1]); // TODO: Save this data for decompiing.
            }

            this.file.setOffset(sequence.fileStart + sequence.eventindex);
            for (let readEvents = 0; readEvents < sequence.numevents; readEvents++) {
                // sequence.events.push(new Event(this.file, this.file.readOffset)); // TODO: Implement reading
            }

            this.file.setOffset(sequence.fileStart + sequence.autolayerindex);
            for (let readAutoLayers = 0; readAutoLayers < sequence.numautolayers; readAutoLayers++) {
                // sequence.autoLayers.push(new AutoLayer(this.file, this.file.readOffset)); // TODO: Implement reading
            }

            this.file.setOffset(sequence.fileStart + sequence.weightlistindex);
            this.file.readFloatArray((sequence.iklockindex - sequence.weightlistindex) / 4); // TODO: Save this data for decompiing.

            // TODO: Read reset of sequence
        }
    }

    public toJSON(): string {
        return '';
    }
}

export default MDLFile;
