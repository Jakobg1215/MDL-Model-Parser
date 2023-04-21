import AimAtBone from './studio/mdl/AimAtBone.ts';
import AnimationDescription from './studio/mdl/AnimationDescription.ts';
import Attachment from './studio/mdl/Attachment.ts';
import AxisInterpBone from './studio/mdl/AxisInterpBone.ts';
import Bone from './studio/mdl/Bone.ts';
import BoneController from './studio/mdl/BoneController.ts';
import Header from './studio/mdl/Header.ts';
import Header2 from './studio/mdl/Header2.ts';
import Hitbox from './studio/mdl/Hitbox.ts';
import HitboxSet from './studio/mdl/HitboxSet.ts';
import JiggleBone from './studio/mdl/JiggleBone.ts';
import ProceduralBoneType from './studio/mdl/ProceduralBoneType.ts';
import QuatInterpBone from './studio/mdl/QuatInterpBone.ts';
import QuatInterpInfo from './studio/mdl/QuatInterpInfo.ts';
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

        file.setOffset(this.header.bonetablebynameindex);
        this.readBoneTableByName();
        file.alignment4(this.logger);

        file.setOffset(this.header.localanimindex);
        for (let readAnimations = 0; readAnimations < this.header.numlocalanim; readAnimations++) {
            this.animations.push(new AnimationDescription(file, file.readOffset));
        }
        this.logger.logStudioRead('Animations', this.header.localanimindex, file.readOffset, this.header.numlocalanim);

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
        this.boneTableByName.push(...this.file.readUnsignedByteArray(this.header.numbones));
        this.logger.logStudioRead('BoneTableByName', this.header.bonetablebynameindex, this.file.readOffset);
    }

    public toJSON(): string {
        return '';
    }
}

export default MDLFile;
