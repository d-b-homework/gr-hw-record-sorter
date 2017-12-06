import * as chai from 'chai';
import * as sinon from 'sinon';
import ArgsReader from '../../src/cli/ArgsReader';
import loggerMock from '../mock/logger';
import commandLineArgs = require("command-line-args");

describe('Test ArgsReader', () => {

    // list of all required arguments
    let allArguments = ['input-file', 'input-format', 'output-sort'];

    // list of arguments with specific possible values
    let enumArguments = {
        'input-format': ['pipe', 'comma', 'space'],
        'output-sort': ['gender', 'birthday', 'name']
    };

    // prepare parsed arguments for commandLineArgs mock
    let parsedArguments = allArguments.reduce(
        (res, val) => {
            res[val] = val;
            return res;
        },
        {}
    );

    // Test mandatory parameter throws exception if missing
    for (let i = 0; i < allArguments.length; i++) {

        // Actual test
        it(`Test mandatory parameter throws exception if missing: --${allArguments[i]}`, () => {
            let parsedArguments = {};
            for (let j = 0; j < allArguments.length; j++) {
                if (i === j) {
                    // skip argument
                    continue;
                }
                parsedArguments[allArguments[j]] = allArguments[j];
            }
            let commandLineArgsMock = sinon.stub().returns(parsedArguments);
            let argsReader = new ArgsReader(loggerMock, commandLineArgsMock);
            try {
                // should throw exception
                argsReader.read();
            } catch (e) {
                // failure if error message mismatch
                chai.assert.equal(e.message, `Parameter is mandatory: --${allArguments[i]}`);
                return;
            }
            // failure if there was no exception
            chai.assert.fail(
                null,
                null,
                `Mandatory parameter is missing, but no exception is thrown: --${allArguments[i]}`
            );
        });
    }

    // Test valid parameter value passes, invalid throws exception
    let enumArgumentNames = Object.keys(enumArguments);
    for (let i = 0; i < enumArgumentNames.length; i++) {

        // Actual test
        it(`Test valid --${enumArgumentNames[i]} passes, invalid throws exception`, () => {
            // tricky way to test definition callbacks:
            // emulating commandLineArgs implementation to get access to definition internals
            let commandLineArgsMock = sinon.stub().callsFake((definitions) => {
                definitions.map((definition: commandLineArgs.OptionDefinition) => {
                    if (definition.name === enumArgumentNames[i]) {
                        // assert valid values
                        for (let j = 0; j < enumArguments[enumArgumentNames[i]].length; j++) {
                            let validValue = enumArguments[enumArgumentNames[i]][j];
                            chai.assert.equal(definition.type(validValue), validValue);
                        }
                        try {
                            // should throw exception
                            definition.type('whatever');
                        } catch (e) {
                            chai.assert.equal(e.message, `Bad parameter value: --${enumArgumentNames[i]}=whatever`);
                            return;
                        }
                        // failure if there was no exception
                        chai.assert.fail(
                            null,
                            null,
                            'Invalid value is passed, but no exception is thrown: --input-format'
                        );
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