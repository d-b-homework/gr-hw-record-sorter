import * as commandLineArgs from "command-line-args";
import {InputFormat, OutputSort} from "../util/Definitions";
import Logger from "../util/Logger";

/**
 * Parse and ensure validity of CLI arguments
 */
export default class ArgsReader {

    constructor(
        private logger: Logger,
        private cliArgs: Function
    ) {}

    read(): Args {
        let definition: Array<AdvancedOptionDefinition> = [
            {
                name: 'input-file',
                type: String,
                mandatory: true
            },
            {
                name: 'input-format',
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
                name: 'output-sort',
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

/**
 * Interface to enrich command-line-args library with "mandatory" configuration option
 */
interface AdvancedOptionDefinition extends commandLineArgs.OptionDefinition {
    name: ArgNames,
    mandatory?: boolean;
}

type ArgNames = 'input-file'|'input-format'|'output-sort';

export type Args = {
    [key in ArgNames]: string;
}

