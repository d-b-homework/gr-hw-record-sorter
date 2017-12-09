import Record from "../app/Record";
import Logger from "../util/Logger";
import {fileFormats, FsInterface, Gender, InputFormat} from "../util/Definitions";

/**
 * Read data from input file
 */
export default class InputReader {

    constructor(
        private logger: Logger,
        private fs: FsInterface
    ) {}

    read(filename: string, format: InputFormat): Promise<Record[]> {
        if (!~Object.keys(fileFormats).indexOf(format)) {
            return Promise.reject(new Error(`Bad file format: ${format}`));
        }

        // 1. Ensure file exists
        return this.fs.exists(filename)

            // 2. Read file content
            .then((exists: boolean) => {
                if (exists) {
                    // for big files its better to use streams read
                    // we assume files are small enough
                    return this.fs.readFile(filename);
                } else {
                    throw new Error(`File does't exist: ${filename}`);
                }
            })

            // 3. Parse file content
            .then((content: Buffer): Record[] => {
                let lines: string[] = content.toString()
                    .split(/\n/g)
                    .map((line: string) => line.trim());
                let result: Record[] = [];
                let lineNumber = 1;
                lines.forEach((line: string) => {
                    if (!line) {
                        // skip empty lines
                        return;
                    }
                    let columns: string[] = line
                        .split(new RegExp(fileFormats[<InputFormat>format].regex, 'g'))
                        .map((col: string) => col.trim());
                    if (columns.length != 5) {
                        throw new Error(`Line #${lineNumber} has ${columns.length} columns instead of expected 5`);
                    }
                    try {
                        result.push(new Record(columns[0], columns[1], <Gender>columns[2], columns[3], columns[4]));
                    } catch (err) {
                        throw new Error(`Line #2 has an error: ${err.message}`);
                    }
                    lineNumber++;
                });
                return result;
            });
    }
}
