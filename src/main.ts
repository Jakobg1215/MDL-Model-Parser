import MDLFile from './MDLFile.ts';
import VTXFile from './VTXFile.ts';
import VVDFile from './VVDFile.ts';
import FileReader from './utilities/FileReader.ts';

// This can be any model that is version 48

new MDLFile(new FileReader(Deno.readFileSync('models/heavy.mdl')));

new VTXFile(new FileReader(Deno.readFileSync('models/heavy.dx90.vtx')));

new VVDFile(new FileReader(Deno.readFileSync('models/heavy.vvd')));
