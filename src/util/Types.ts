export declare type InputFormat = 'pipe'|'comma'|'space';

export declare type OutputSort = 'gender'|'birthday'|'name';

/**
 * Overwrite of standard Response interface
 * to workaround different json signature enabled by middleware
 */
export interface Response {
    json: Function;
}
