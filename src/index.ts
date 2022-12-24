import { readFileSync, writeFileSync } from 'node:fs';
import FileReader from './FileReader';
import ReadPhy from './ReadPhy';
import ReadMDL from './ReadMDL';
import ReadVTX from './ReadVTX';
import ReadVVD from './ReadVVD';

// This is using the model mossman from Garry's Mod as a base
// This can be changed to any model you want for testing

const dx80VTXData = new ReadVTX(new FileReader(readFileSync('models/mossman.dx80.vtx')));
const dx90VTXData = new ReadVTX(new FileReader(readFileSync('models/mossman.dx90.vtx')));
const mdlData = new ReadMDL(new FileReader(readFileSync('models/mossman.mdl')));
const phyData = new ReadPhy(new FileReader(readFileSync('models/mossman.phy')));
const VVDData = new ReadVVD(new FileReader(readFileSync('models/mossman.vvd')));

writeFileSync('models/json/mossman.dx80.vtx.json', dx80VTXData.toJSON());
writeFileSync('models/json/mossman.dx90.vtx.json', dx90VTXData.toJSON());
writeFileSync('models/json/mossman.mdl.json', mdlData.toJSON());
writeFileSync('models/json/mossman.phy.json', phyData.toJSON());
writeFileSync('models/json/mossman.vvd.json', VVDData.toJSON());
