import type FileReader from './FileReader';
import ReadAnimationBlock from './MDLReaders/ReadAnimationBlock';
import ReadAnimationDescription from './MDLReaders/ReadAnimationDescription';
import ReadAttachment from './MDLReaders/ReadAttachment';
import ReadBodyParts from './MDLReaders/ReadBodyParts';
import ReadBone from './MDLReaders/ReadBone';
import ReadBoneController from './MDLReaders/ReadBoneController';
import ReadFlexController from './MDLReaders/ReadFlexController';
import ReadFlexControllerUI from './MDLReaders/ReadFlexControllerUI';
import ReadFlexDescription from './MDLReaders/ReadFlexDescription';
import ReadFlexRule from './MDLReaders/ReadFlexRule';
import ReadHeader from './MDLReaders/ReadHeader';
import ReadHeader2 from './MDLReaders/ReadHeader2';
import ReadHitboxSet from './MDLReaders/ReadHitboxSet';
import ReadIKChain from './MDLReaders/ReadIKChain';
import ReadIKLock from './MDLReaders/ReadIKLock';
import ReadModelGroup from './MDLReaders/ReadModelGroup';
import ReadMouth from './MDLReaders/ReadMouth';
import ReadPoseParamDescription from './MDLReaders/ReadPoseParamDescription';
import ReadSequenceDescription from './MDLReaders/ReadSequenceDescription';
import ReadSrcBoneTransform from './MDLReaders/ReadSrcBoneTransform';
import ReadTexture from './MDLReaders/ReadTexture';

class ReadMDL {
    public readonly header: ReadHeader;
    public readonly header2: ReadHeader2;
    public readonly bones: ReadBone[] = [];
    public readonly boneControllers: ReadBoneController[] = [];
    public readonly localAttachments: ReadAttachment[] = [];
    public readonly hitboxSets: ReadHitboxSet[] = [];
    public readonly boneTableByName: number[];
    public readonly localAnimations: ReadAnimationDescription[] = [];
    public readonly localSequences: ReadSequenceDescription[] = [];
    public readonly bodyParts: ReadBodyParts[] = [];
    public readonly flexDescriptions: ReadFlexDescription[] = [];
    public readonly flexControllers: ReadFlexController[] = [];
    public readonly flexControllerUIs: ReadFlexControllerUI[] = [];
    public readonly flexRules: ReadFlexRule[] = [];
    public readonly ikChains: ReadIKChain[] = [];
    public readonly ikLocks: ReadIKLock[] = [];
    public readonly mouths: ReadMouth[] = [];
    public readonly poseParameters: ReadPoseParamDescription[] = [];
    public readonly modelGroups: ReadModelGroup[] = [];
    public readonly animationBlocks: ReadAnimationBlock[] = [];
    public readonly textures: ReadTexture[] = [];
    public readonly textureDirectories: number[] = [];
    public readonly textureFamilies: number[] = [];
    public readonly srcBoneTransformations: ReadSrcBoneTransform[] = [];

    public constructor(file: FileReader) {
        const fileSize = file.readableBytes.length;
        console.log('MDL File size: %d', fileSize);
        this.header = new ReadHeader(file);

        // Tried to keep the order of the readers the same as the order of StudioMDL.

        /* Header 2 */

        // From looking at the source code, header2 may be optional.
        this.header2 = new ReadHeader2(file);

        /* Bones */

        for (let boneReader = 0; boneReader < this.header.numbones; boneReader++) {
            file.setOffset(this.header.boneindex + boneReader * 216);
            this.bones.push(new ReadBone(file)); // Done
        }

        /* Bone Controllers */

        for (let boneControllerReader = 0; boneControllerReader < this.header.numbonecontrollers; boneControllerReader++) {
            file.setOffset(this.header.bonecontrollerindex + boneControllerReader * 56);
            this.boneControllers.push(new ReadBoneController(file)); // Done
        }

        /* Attachments */

        for (let localAttachmentReader = 0; localAttachmentReader < this.header.numlocalattachments; localAttachmentReader++) {
            file.setOffset(this.header.localattachmentindex + localAttachmentReader * 92);
            this.localAttachments.push(new ReadAttachment(file)); // Done
        }

        /* Hitbox Sets */

        for (let hitboxSetReader = 0; hitboxSetReader < this.header.numhitboxsets; hitboxSetReader++) {
            file.setOffset(this.header.hitboxsetindex + hitboxSetReader * 12);
            this.hitboxSets.push(new ReadHitboxSet(file)); // Done
        }

        /* Bone Table */

        // What is this for?
        file.setOffset(this.header.bonetablebynameindex);
        this.boneTableByName = file.readByteArray(this.header.numbones); // This is not reading all the bytes

        /* Animations */

        for (let localAnimationReader = 0; localAnimationReader < this.header.numlocalanim; localAnimationReader++) {
            file.setOffset(this.header.localanimindex + localAnimationReader * 100);
            this.localAnimations.push(new ReadAnimationDescription(file)); // Not Done
        }

        /* Sequences */

        for (let sequenceReader = 0; sequenceReader < this.header.numlocalseq; sequenceReader++) {
            file.setOffset(this.header.localseqindex + sequenceReader * 212);
            this.localSequences.push(new ReadSequenceDescription(file, this.header.numbones)); // Not Done
        }

        /* Node Name */

        /* Nodes */

        // TODO: Add nodes reader

        /* Body Parts */

        for (let bodyPartReader = 0; bodyPartReader < this.header.numbodyparts; bodyPartReader++) {
            file.setOffset(this.header.bodypartindex + bodyPartReader * 16);
            this.bodyParts.push(new ReadBodyParts(file)); // Not Done
        }

        /* Flex Discriptions */

        for (let flexDescriptionReader = 0; flexDescriptionReader < this.header.numflexdesc; flexDescriptionReader++) {
            file.setOffset(this.header.flexdescindex + flexDescriptionReader * 4);
            this.flexDescriptions.push(new ReadFlexDescription(file)); // Done
        }

        /* Flex Controllers */

        for (let flexControllerReader = 0; flexControllerReader < this.header.numflexcontrollers; flexControllerReader++) {
            file.setOffset(this.header.flexcontrollerindex + flexControllerReader * 20);
            this.flexControllers.push(new ReadFlexController(file)); // Done
        }

        /* Flex Rules */

        for (let flexRuleReader = 0; flexRuleReader < this.header.numflexrules; flexRuleReader++) {
            file.setOffset(this.header.flexruleindex + flexRuleReader * 12);
            this.flexRules.push(new ReadFlexRule(file)); // Done
        }

        /* Flex Controller UI */

        for (let flexControllerUIReader = 0; flexControllerUIReader < this.header.numflexcontrollerui; flexControllerUIReader++) {
            file.setOffset(this.header.flexcontrolleruiindex + flexControllerUIReader * 20);
            this.flexControllerUIs.push(new ReadFlexControllerUI(file)); // Done
        }

        /* IK Chains */

        for (let ikChainReader = 0; ikChainReader < this.header.numikchains; ikChainReader++) {
            file.setOffset(this.header.ikchainindex + ikChainReader * 16);
            this.ikChains.push(new ReadIKChain(file)); // Done
        }

        /* IK Locks */

        for (let ikLockReader = 0; ikLockReader < this.header.numlocalikautoplaylocks; ikLockReader++) {
            file.setOffset(this.header.localikautoplaylockindex + ikLockReader * 32);
            this.ikLocks.push(new ReadIKLock(file)); // Done
        }

        /* Mouths */

        for (let mouthsReader = 0; mouthsReader < this.header.nummouths; mouthsReader++) {
            file.setOffset(this.header.mouthindex + mouthsReader * 20);
            this.mouths.push(new ReadMouth(file)); // Done
        }

        /* Pose Parameters */

        for (let poseParameterReader = 0; poseParameterReader < this.header.numlocalposeparameters; poseParameterReader++) {
            file.setOffset(this.header.localposeparamindex + poseParameterReader * 20);
            this.poseParameters.push(new ReadPoseParamDescription(file)); // Done
        }

        /* Model Groups */

        for (let modelGroupReader = 0; modelGroupReader < this.header.numincludemodels; modelGroupReader++) {
            file.setOffset(this.header.includemodelindex + modelGroupReader * 8);
            this.modelGroups.push(new ReadModelGroup(file)); // Done
        }

        /* Animation Blocks */

        for (let animationBlockReader = 0; animationBlockReader < this.header.numanimblocks; animationBlockReader++) {
            file.setOffset(this.header.animblockindex + animationBlockReader * 8);
            this.animationBlocks.push(new ReadAnimationBlock(file)); // Done
        }

        /* Textures */

        for (let textureReader = 0; textureReader < this.header.numtextures; textureReader++) {
            file.setOffset(this.header.textureindex + textureReader * 64);
            this.textures.push(new ReadTexture(file)); // Done
        }

        /* Texture Directories */

        file.setOffset(this.header.cdtextureindex);
        this.textureDirectories = file.readIntArray(this.header.numcdtextures);

        /* Texture Families */

        file.setOffset(this.header.skinindex);
        this.textureFamilies = file.readShortArray(this.header.numskinfamilies * this.header.numskinref);

        /* Key Values */

        file.setOffset(this.header.keyvalueindex);
        console.log(file.readString(this.header.keyvaluesize));

        /* Bone Transformations */

        for (let srcboneTransformationReader = 0; srcboneTransformationReader < this.header2.numsrcbonetransform; srcboneTransformationReader++) {
            file.setOffset(this.header2.srcbonetransformindex + srcboneTransformationReader * 132);
            this.srcBoneTransformations.push(new ReadSrcBoneTransform(file)); // Done
        }

        /* Liner Bone */

        // TODO: Add Liner Bone reader

        /* Bone Flex Drivers */

        // TODO: Add Bone Flex Drivers reader

        console.log('MDL Read Bytes: %d, %d unread bytes', file.readByteCount, fileSize - file.readByteCount);
    }

    public toJSON(): string {
        return JSON.stringify({
            Header: this.header,
        });
    }
}

export default ReadMDL;
