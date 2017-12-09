/**
 * Constants, settings and types definitions
 */

// Input format names type
export type InputFormat = 'pipe'|'comma'|'space';
// Input format type
export interface FileFormat {
    name: InputFormat;
    separator: string;
    regex: string;
}
// Input formats definition
export let fileFormats:{[key in InputFormat]: FileFormat} = [
    {
        name: 'pipe',
        separator: '|',
        regex: '\\|'
    },
    {
        name: 'comma',
        separator: ',',
        regex: ','
    },
    {
        name: 'space',
        separator: ' ',
        regex: '\\s+'
    },
].reduce(
    (res, format: FileFormat) => {
        res[format.name] = format;
        return res;
    },
    <{[key in InputFormat]: FileFormat}>{}
);

// Output sorts type
export type OutputSort = 'gender'|'birthday'|'name';
// Output sorts definition
export let outputSorts = ['gender', 'birthday', 'name'];

// Genders type
export type Gender = 'female'|'male';
// Genders definition
export let genders = ['female', 'male'];

// "fs" basic interface type to be used for dependency injection
export interface FsInterface {
    exists: Function;
    readFile: Function;
}

// Popular type shortcut
export type KeyStringValueString = {[key: string]: string};

