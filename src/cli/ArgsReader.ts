import * as commandLineArgs from "command-line-args";
import {InputFormat, OutputSort} from "../util/Types";
import Logger from "../util/Logger";

/**
 * Parse and ensure validity of command line arguments
 */
export default class ArgsReader {

    constructor(
        private logger: Logger,
        private cliArgs: Function
    ) {}

    /**
     * @returns {Args}
     * @throws {Error}
     */
    read(): Args {
        this.logger.info('reading command line parameters...');
        let definition: Array<AdvancedOptionDefinition> = [
            {
                name: "input-file",
                type: String,
                mandatory: true
            },
            {
                name: "input-format",
                type: (value: InputFormat) => {
                    if (~['pipe', 'comma', 'space'].indexOf(value)) {
                        return value;
                    } else {
                        throw new Error(`Bad parameter value: --input-format=${value}`);
                    }
                },
                mandatory: true
            },
            {
                name: "output-sort",
                type: (value: OutputSort) => {
                    if (~['gender', 'birthday', 'name'].indexOf(value)) {
                        return value;
                    } else {
                        throw new Error(`Bad parameter value: --output-sort=${value}`);
                    }
                },
                mandatory: true
            },
        ];
        let args = this.cliArgs(definition);
        this.ensureMandatoryArgs(definition, args);
        return args;
    }

    private ensureMandatoryArgs(definition: Array<AdvancedOptionDefinition>, args: Args) {
        for (let i = 0; i < definition.length; i++) {
            if (definition[i].mandatory && !args[definition[i].name]) {
                throw new Error(`Parameter is mandatory: --${definition[i].name}`);
            }
        }
    }
}

type ArgNames = 'input-file'|'input-format'|'output-sort';

interface AdvancedOptionDefinition extends commandLineArgs.OptionDefinition {
    name: ArgNames,
    mandatory?: boolean;
}

export type Args = {
    [key in ArgNames]: string;
}

