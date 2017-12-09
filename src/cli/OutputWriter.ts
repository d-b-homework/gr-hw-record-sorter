import Record from "../app/Record";
import Logger from "../util/Logger";
import {fileFormats, InputFormat} from "../util/Definitions";

/**
 * Write output using provided function
 */
export default class OutputWriter {
    constructor(
        private logger: Logger,
        private writeLn: Function
    ) {}

    write(records: Record[], format: InputFormat): void {
        if (!~Object.keys(fileFormats).indexOf(format)) {
            throw new Error(`Bad file format: ${format}`);
        }

        let separator = fileFormats[format].separator;
        records.forEach((record: Record) => {
            this.writeLn(
                record.firstName + separator +
                record.lastName + separator +
                record.gender + separator +
                record.favoriteColor + separator +
                record.birthday
            );
        });
    }
}