import Record from "../app/Record";
import {fs} from "mz";
import Logger from "../util/Logger";


export default class InputReader {

    constructor(
        private logger: Logger
    ) {}

    read(filename: string, format: string): Promise<Record[]> {
        return fs.exists(filename)
            .then((exists: boolean) => {
                if (exists) {
                    return fs.readFile(filename);
                } else {
                    throw new Error(`File does't exist: ${filename}`);
                }
            })
            .then((content: Buffer) => {
                this.logger.info(content);
                return [];
            });
    }
}
