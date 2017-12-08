export type InputFormat = 'pipe'|'comma'|'space';

export type OutputSort = 'gender'|'birthday'|'name';
export let outputSorts = ['gender', 'birthday', 'name'];

export type KeyStringValueString = {[key: string]: string};

export type Gender = 'female'|'male';
export let genders = ['female', 'male'];

export interface Response {
    json: Function;
}

export interface FsInterface {
    exists: Function;
    readFile: Function;
}

export interface FileFormat {
    name: InputFormat;
    separator: string;
    regex: string;
}

export let fileFormats:{[key in InputFormat]: FileFormat} = [
    {
        name: 'pipe',
        separator: '|',
        regex: '\\|'
    },
    {
        name: 'coma',
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
