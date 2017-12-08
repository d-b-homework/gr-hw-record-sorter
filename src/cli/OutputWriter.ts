import Record from "../app/Record";
import Logger from "../util/Logger";

export default class OutputWriter {
    constructor(
        private logger: Logger
    ) {}

    write(records: Record[]) {
        console.log(JSON.stringify(records));
    }
}