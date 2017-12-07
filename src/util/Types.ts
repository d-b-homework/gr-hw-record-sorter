export declare type InputFormat = 'pipe'|'comma'|'space';

export declare type OutputSort = 'gender'|'birthday'|'name';

export type KeyStringValueString = {[key: string]: string};

/**
 * Overwrite of standard Response interface
 * to workaround different json signature enabled by middleware
 */
export interface Response {
    json: Function;
}

/**
 *
 */
export interface FsInterface {
    exists: Function;
    readFile: Function;
}