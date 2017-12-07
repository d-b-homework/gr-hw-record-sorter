import Record from "../app/Record";
import Logger from "../util/Logger";
import {FsInterface} from "../util/Types";

export default class InputReader {

    constructor(
        private logger: Logger,
        private fs: FsInterface
    ) {}

    read(filename: string, format: string): Promise<Record[]> {
        if (!~['pipe', 'comma', 'space'].indexOf(format)) {
            return Promise.reject(new Error(`Bad file format: ${format}`));
        }
        return this.fs.exists(filename)
            .then((exists: boolean) => {
                if (exists) {
                    return this.fs.readFile(filename);
                } else {
                    throw new Error(`File does't exist: ${filename}`);
                }
            })
            .then((content: Buffer): Record[] => {
                this.logger.info(content);
                return [
                    new Record('LastNameOne', 'FirstNameOne', 'male', 'red', new Date('10/13/1919')),
                    new Record('LastNameTwo', 'FirstNameTwo', 'female', 'green', new Date('10/13/1920')),
                    new Record('LastNameThree', 'FirstNameThree', 'male', 'blue', new Date('10/13/1921'))
                ];
            });
    }
}
