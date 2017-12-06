import {OutputSort} from "../util/Types";
import Record from "../app/Record";
import Logger from "../util/Logger";

export default class RecordSorter {
    constructor(
        private logger: Logger
    ) {}

    sort(records: Record[], sort: OutputSort) {
        return records;
    }
}