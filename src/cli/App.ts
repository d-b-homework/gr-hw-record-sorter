import ArgsReader, {Args} from "./ArgsReader";
import Logger from "../util/Logger";
import InputReader from "./InputReader";
import RecordSorter from "../app/RecordSorter";
import OutputWriter from "./OutputWriter";
import Record from "../app/Record";
import {InputFormat, OutputSort} from "../util/Definitions";

/**
 * CLI application
 */
export default class App {

    constructor(
        private logger: Logger,
        private argsReader: ArgsReader,
        private inputReader: InputReader,
        private recordSorter: RecordSorter,
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

            // 3. Sort read data
            .then((records: Record[]) => {
                return this.recordSorter.sort(records, <OutputSort>args['output-sort']);
            })

            // 4. Write output
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
