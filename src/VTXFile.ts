import BodyPartHeader from './studio/vtx/BodyPartHeader.ts';
import BoneStateChangeHeader from './studio/vtx/BoneStateChangeHeader.ts';
import FileHeader from './studio/vtx/FileHeader.ts';
import MaterialReplacementHeader from './studio/vtx/MaterialReplacementHeader.ts';
import MaterialReplacementListHeader from './studio/vtx/MaterialReplacementListHeader.ts';
import MeshHeader from './studio/vtx/MeshHeader.ts';
import ModelHeader from './studio/vtx/ModelHeader.ts';
import ModelLODHeader from './studio/vtx/ModelLODHeader.ts';
import StripGroupHeader from './studio/vtx/StripGroupHeader.ts';
import StripHeader from './studio/vtx/StripHeader.ts';
import Vertex from './studio/vtx/Vertex.ts';
import type FileReader from './utilities/FileReader.ts';
import Logger from './utilities/Logger.ts';

class VTXFile {
    private readonly logger = new Logger('VTXFile');
    public readonly header: FileHeader;

    public readonly bodyParts: BodyPartHeader[] = [];
    public readonly materialReplacementLists: MaterialReplacementListHeader[] = [];

    public constructor(private readonly file: FileReader) {
        this.header = new FileHeader(file, file.readOffset);
        this.logger.logStudioRead('FileHeader', this.header.fileStart, file.readOffset);

        file.setOffset(this.header.bodyPartOffset);
        for (let readBodyParts = 0; readBodyParts < this.header.numBodyParts; readBodyParts++) {
            this.bodyParts.push(new BodyPartHeader(file, file.readOffset));
        }
        this.logger.logStudioRead('BodyPartHeaders', this.header.bodyPartOffset, file.readOffset, this.header.numBodyParts);

        this.readModels();

        file.setOffset(this.header.materialReplacementListOffset);
        for (let readMaterialReplacementLists = 0; readMaterialReplacementLists < this.header.numLODs; readMaterialReplacementLists++) {
            const replacement = new MaterialReplacementListHeader(file, file.readOffset);
            if (replacement.replacementOffset <= 0) continue;
            this.materialReplacementLists.push(replacement);
        }
        this.logger.logStudioRead('MaterialReplacementListHeaders', this.header.materialReplacementListOffset, file.readOffset, this.header.numLODs);

        this.readMaterialReplacement();

        this.logger.logStudioRead('VTXFile', 0, file.readCount, this.file.fileSize);

        this.logger.close();
    }

    private readModels(): void {
        const models: ModelHeader[] = [];
        const fileStart = this.file.readOffset;

        for (const bodyPart of this.bodyParts) {
            this.file.setOffset(bodyPart.fileStart + bodyPart.modelOffset);

            for (let readModels = 0; readModels < bodyPart.numModels; readModels++) {
                const model = new ModelHeader(this.file, this.file.readOffset);
                bodyPart.models.push(model);
                models.push(model);
            }
        }
        this.logger.logStudioRead('ModelHeaders', fileStart, this.file.readOffset, models.length);

        this.readModelLODHeaders(models);
    }

    private readModelLODHeaders(models: ModelHeader[]): void {
        const modelLODs: ModelLODHeader[] = [];
        const fileStart = this.file.readOffset;

        for (const model of models) {
            this.file.setOffset(model.fileStart + model.lodOffset);

            for (let readModelLODHeaders = 0; readModelLODHeaders < model.numLODs; readModelLODHeaders++) {
                const modelLOD = new ModelLODHeader(this.file, this.file.readOffset);
                model.modelLODs.push(modelLOD);
                modelLODs.push(modelLOD);
            }
        }
        this.logger.logStudioRead('ModelLODHeaders', fileStart, this.file.readOffset, modelLODs.length);

        this.readMeshes(modelLODs);
    }

    private readMeshes(modelLODs: ModelLODHeader[]): void {
        const meshes: MeshHeader[] = [];
        const fileStart = this.file.readOffset;

        for (const modelLOD of modelLODs) {
            this.file.setOffset(modelLOD.fileStart + modelLOD.meshOffset);

            for (let readMeshes = 0; readMeshes < modelLOD.numMeshes; readMeshes++) {
                const mesh = new MeshHeader(this.file, this.file.readOffset);
                modelLOD.meshes.push(mesh);
                meshes.push(mesh);
            }
        }
        this.logger.logStudioRead('MeshHeaders', fileStart, this.file.readOffset, meshes.length);

        this.readStripGroups(meshes);
    }

    private readStripGroups(meshes: MeshHeader[]): void {
        const stripGroups: StripGroupHeader[] = [];
        const fileStart = this.file.readOffset;

        const hasTopology = this.checkForTopology(meshes);
        for (const mesh of meshes) {
            this.file.setOffset(mesh.fileStart + mesh.stripGroupHeaderOffset);

            for (let readStripGroups = 0; readStripGroups < mesh.numStripGroups; readStripGroups++) {
                const stripGroup = new StripGroupHeader(this.file, this.file.readOffset, hasTopology);
                mesh.stripGroups.push(stripGroup);
                stripGroups.push(stripGroup);
            }
        }
        this.logger.logStudioRead('StripGroupHeaders', fileStart, this.file.readOffset, stripGroups.length);

        const strips = this.readStrips(stripGroups, hasTopology);
        this.readVertices(stripGroups);
        this.readIndices(stripGroups);
        this.readBoneStateChanges(strips);
    }

    private checkForTopology(meshes: MeshHeader[]): boolean {
        const first = meshes[0];

        let pre = first.fileStart + first.stripGroupHeaderOffset;
        let offsets = 0;

        for (const mesh of meshes.slice(1)) {
            offsets += mesh.fileStart + mesh.stripGroupHeaderOffset - pre;
            pre = mesh.fileStart + mesh.stripGroupHeaderOffset;
        }

        return offsets % 33 === 0;
    }

    private readStrips(stripGroups: StripGroupHeader[], hasTopology: boolean): StripHeader[] {
        const strips: StripHeader[] = [];
        const fileStart = this.file.readOffset;

        for (const stripGroup of stripGroups) {
            this.file.setOffset(stripGroup.fileStart + stripGroup.stripOffset);

            for (let readStrips = 0; readStrips < stripGroup.numStrips; readStrips++) {
                const strip = new StripHeader(this.file, this.file.readOffset, hasTopology);
                stripGroup.strips.push(strip);
                strips.push(strip);
            }
        }
        this.logger.logStudioRead('StripHeaders', fileStart, this.file.readOffset, strips.length);

        return strips;
    }

    private readBoneStateChanges(strips: StripHeader[]): void {
        const fileStart = this.file.readOffset;

        for (const strip of strips) {
            this.file.setOffset(strip.fileStart + strip.boneStateChangeOffset);

            for (let readBoneStateChanges = 0; readBoneStateChanges < strip.numBoneStateChanges; readBoneStateChanges++) {
                strip.boneStateChanges.push(new BoneStateChangeHeader(this.file, this.file.readOffset));
            }
        }
        this.logger.logStudioRead('BoneStateChangeHeaders', fileStart, this.file.readOffset);
    }

    private readVertices(stripGroups: StripGroupHeader[]): void {
        const fileStart = this.file.readOffset;

        for (const stripGroup of stripGroups) {
            this.file.setOffset(stripGroup.fileStart + stripGroup.vertOffset);

            for (let readVertices = 0; readVertices < stripGroup.numVerts; readVertices++) {
                stripGroup.vertices.push(new Vertex(this.file, this.file.readOffset));
            }
        }
        this.logger.logStudioRead('Vertices', fileStart, this.file.readOffset);
    }

    private readIndices(stripGroups: StripGroupHeader[]): void {
        const fileStart = this.file.readOffset;

        for (const stripGroup of stripGroups) {
            this.file.setOffset(stripGroup.fileStart + stripGroup.indexOffset);

            for (let readIndices = 0; readIndices < stripGroup.numIndices; readIndices++) {
                stripGroup.indices.push(this.file.readUnsignedShort());
            }
        }
        this.logger.logStudioRead('Indices', fileStart, this.file.readOffset);
    }

    private readMaterialReplacement(): void {
        const fileStart = this.file.readOffset;

        for (const materialReplacementList of this.materialReplacementLists) {
            this.file.setOffset(materialReplacementList.fileStart + materialReplacementList.replacementOffset);

            for (let readMaterialReplacement = 0; readMaterialReplacement < materialReplacementList.numReplacements; readMaterialReplacement++) {
                const materialReplacement = new MaterialReplacementHeader(this.file, this.file.readOffset);
                materialReplacementList.materialReplacements.push(materialReplacement);
            }
        }
        this.logger.logStudioRead('MaterialReplacementHeaders', fileStart, this.file.readOffset, this.materialReplacementLists.length);
    }
}

export default VTXFile;
