import ArgsReader, {Args} from "./ArgsReader";
import Logger from "../util/Logger";
import InputReader from "./InputReader";
import OutputWriter from "./OutputWriter";
import Record from "../app/Record";
import {InputFormat} from "../util/Definitions";
import RecordService from "../app/RecordService";

/**
 * CLI application
 */
export default class App {

    constructor(
        private logger: Logger,
        private argsReader: ArgsReader,
        private inputReader: InputReader,
        private recordService: RecordService,
        private outputWriter: OutputWriter
    ) {}

    /**
     * Entry point
     */
    run(): void {
        let args: Args;

        // 1. Parse CLI arguments and save in local variable
        this.parseArgs()
            .then((parsedArgs: Args) => {
                args = parsedArgs;
            })

            // 2. Read data from input file
            .then(() => {
                return this.inputReader.read(args['input-file'], <InputFormat>args['input-format']);
            })

            // 3. Save to Record service
            .then((records: Record[]) => {
                records.forEach((record: Record) => {
                    this.recordService.add(record);
                });
            })

            // 4. Get sorted data
            .then(() => {
                switch (args['output-sort']) {
                    case 'gender':
                        return this.recordService.getAllSortByGender();
                    case 'birthday':
                        return this.recordService.getAllSortByBirthday();
                    case 'name':
                        return this.recordService.getAllSortByName();
                    default:
                        throw new Error(`Unexpected output sort ${args['output-sort']}`);
                }
            })

            // 5. Write output
            .then((records: Record[]) => {
                return this.outputWriter.write(records, <InputFormat>args['input-format']);
            })

            // Log any error
            .catch((e: Error) => {
                this.logger.error(e.message);
            });
    }

    /**
     * Method used to promisify CLI arguments parsing
     * to unify final "catch" call on the promise chain
     */
    private parseArgs(): Promise<Args> {
        return new Promise((resolve: Function, reject: Function) => {
            try {
                resolve(this.argsReader.read());
            } catch (err) {
                reject(err);
            }
        });
    }
}
