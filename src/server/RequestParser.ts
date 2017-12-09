import Record from "../app/Record";
import {Gender} from "../util/Definitions";

/**
 * Parse request body
 */
export default class RequestParser {

    /**
     * Translate input to Record object
     * Throw exception in case of any failure
     */
    parseRecord(input: any): Record {
        let errorMessage = `Valid object is expected`;

        if (typeof input !== 'object' || input === null) {
            throw new Error(errorMessage);
        }
        let keys = Object.keys(input);
        let expectedKeys = ['firstName', 'lastName', 'gender', 'favoriteColor', 'birthday'];
        keys.forEach((key: string) => {
            if (!~expectedKeys.indexOf(key)) {
                throw new Error(errorMessage);
            }
        });
        expectedKeys.forEach((expectedKey: string) => {
            if (!~keys.indexOf(expectedKey)) {
                throw new Error(errorMessage);
            }
        });
        return new Record(
            input.firstName,
            input.lastName,
            <Gender> input.gender,
            input.favoriteColor,
            input.birthday
        );
    }
}