import { readFileSync, writeFileSync } from 'node:fs';
import FileReader from './FileReader';
import ReadPhy from './ReadPhy';
import ReadMDL from './ReadMDL';
import ReadVTX from './ReadVTX';
import ReadVVD from './ReadVVD';

// This is using the model heavy from Team Fortress 2 as a base
// This can be changed to any model you want for testing

const dx80VTXData = new ReadVTX(new FileReader(readFileSync('models/heavy.dx80.vtx')));
const dx90VTXData = new ReadVTX(new FileReader(readFileSync('models/heavy.dx90.vtx')));
const swVTXData = new ReadVTX(new FileReader(readFileSync('models/heavy.sw.vtx')));
const mdlData = new ReadMDL(new FileReader(readFileSync('models/heavy.mdl')));
const phyData = new ReadPhy(new FileReader(readFileSync('models/heavy.phy')));
const VVDData = new ReadVVD(new FileReader(readFileSync('models/heavy.vvd')));

writeFileSync('models/json/heavy.dx80.vtx.json', dx80VTXData.toJSON());
writeFileSync('models/json/heavy.dx90.vtx.json', dx90VTXData.toJSON());
writeFileSync('models/json/heavy.sw.vtx.json', swVTXData.toJSON());
writeFileSync('models/json/heavy.mdl.json', mdlData.toJSON());
writeFileSync('models/json/heavy.phy.json', phyData.toJSON());
writeFileSync('models/json/heavy.vvd.json', VVDData.toJSON());
