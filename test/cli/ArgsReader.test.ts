import * as chai from 'chai';
import * as sinon from 'sinon';
import ArgsReader from '../../src/cli/ArgsReader';
import loggerMock from '../mock/logger';
import commandLineArgs = require("command-line-args");
import {KeyStringValueString} from "../../src/util/Definitions";

describe('Test ArgsReader', () => {

    // list of all required arguments
    let allArguments = ['input-file', 'input-format', 'output-sort'];

    // list of arguments with specific possible values
    let enumArguments: {[key: string]: Array<string>} = {
        'input-format': ['pipe', 'comma', 'space'],
        'output-sort': ['gender', 'birthday', 'name']
    };

    // prepare parsed arguments for commandLineArgs mock
    let parsedArguments = allArguments.reduce(
        (res, val) => {
            res[val] = val;
            return res;
        },
        <KeyStringValueString>{}
    );

    // Test mandatory parameter throws exception if missing
    for (let i = 0; i < allArguments.length; i++) {

        // Actual test
        it(`Test mandatory parameter throws exception if missing: --${allArguments[i]}`, () => {
            let parsedArguments: KeyStringValueString = {};
            for (let j = 0; j < allArguments.length; j++) {
                if (i === j) {
                    // skip argument
                    continue;
                }
                parsedArguments[allArguments[j]] = allArguments[j];
            }
            let commandLineArgsMock = sinon.stub().returns(parsedArguments);
            let argsReader = new ArgsReader(loggerMock, commandLineArgsMock);
            chai
                .expect(argsReader.read.bind(argsReader))
                .throw(`Parameter is mandatory: --${allArguments[i]}`);
        });
    }

    // Test valid parameter value passes, invalid throws exception
    let enumArgumentNames: Array<string> = Object.keys(enumArguments);
    for (let i = 0; i < enumArgumentNames.length; i++) {

        // Actual test
        it(`Test valid --${enumArgumentNames[i]} passes, invalid throws exception`, () => {
            // tricky way to test definition callbacks:
            // emulating commandLineArgs implementation to get access to "definition" internals
            let commandLineArgsMock = sinon.stub().callsFake((definitions) => {
                definitions.map((definition: commandLineArgs.OptionDefinition) => {
                    if (definition.name === enumArgumentNames[i]) {
                        // assert valid values
                        for (let j = 0; j < enumArguments[enumArgumentNames[i]].length; j++) {
                            let validValue = enumArguments[enumArgumentNames[i]][j];
                            chai
                                .expect(definition.type(validValue))
                                .equals(validValue);
                        }
                        chai
                            .expect(definition.type.bind(definition, 'whatever'))
                            .throw(`Bad parameter value: --${enumArgumentNames[i]}=whatever`);
                    }
                });
                // return parsed arguments so ArgReader doesn't complain about mandatory parameter
                // (see first case)
                return parsedArguments;
            });
            let argsReader = new ArgsReader(loggerMock, commandLineArgsMock);
            argsReader.read();
        });
    }

});