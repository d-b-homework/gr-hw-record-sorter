import Record from "../app/Record";
import {Gender} from "../util/Definitions";

export default class RequestParser {

    parseRecord(input: any): Record {

        return new Record(
            '',
            '',
            <Gender> 'female',
            '',
            ''
        );
    }
}