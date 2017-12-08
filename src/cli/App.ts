import ArgsReader, {Args} from "./ArgsReader";
import Logger from "../util/Logger";
import InputReader from "./InputReader";
import RecordSorter from "../app/RecordSorter";
import OutputWriter from "./OutputWriter";
import Record from "../app/Record";
import {OutputSort} from "../util/Definitions";

export default class App {

    constructor(
        private logger: Logger,
        private argsReader: ArgsReader,
        private inputReader: InputReader,
        private recordSorter: RecordSorter,
        private outputWriter: OutputWriter
    ) {}

    run(): void {
        let args: Args;
        this.parseArgs()
            .then((parsedArgs: Args) => {
                args = parsedArgs;
            })
            .then(() => {
                return this.inputReader.read(args['input-file'], args['input-format']);
            })
            .then((records: Record[]) => {
                return this.recordSorter.sort(records, <OutputSort>args['output-sort']);
            })
            .then((records: Record[]) => {
                return this.outputWriter.write(records);
            })
            .catch((e: Error) => {
                this.logger.error(e.message);
            });
    }

    /**
     * Promisify arguments parsing to unify final "catch" call on the promise chain
     *
     * @returns {Promise<Args>}
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
