import * as chai from 'chai';
import * as sinon from 'sinon';
import loggerMock from '../mock/logger';
import InputReader from "../../src/cli/InputReader";
import {FsInterface, KeyStringValueString} from "../../src/util/Types";
import Record from "../../src/app/Record";

describe('Test InputReader', () => {

    it(`Test promise is rejected if input format is invalid`, () => {
        let fsMock: FsInterface = <FsInterface>{};
        let inputReader = new InputReader(loggerMock, fsMock);
        return inputReader
            .read('dummy-file', 'dummy-format')
            .catch((err: Error) => {
                chai.expect(err.message).equal('Bad file format: dummy-format');
            });
    });

    it(`Test promise is rejected if file is missing`, () => {
        let fsMock: FsInterface = <FsInterface>{};
        fsMock.exists = sinon.stub().resolves(false);
        let inputReader = new InputReader(loggerMock, fsMock);
        return inputReader
            .read('dummy-file', 'pipe')
            .catch((err: Error) => {
                chai.expect(err.message).equal('File does\'t exist: dummy-file');
            });
    });

    // Test promise resolve to array of Record objects
    let expected = [
        new Record('LastNameOne', 'FirstNameOne', 'male', 'red', new Date('10/13/1919')),
        new Record('LastNameTwo', 'FirstNameTwo', 'female', 'green', new Date('10/13/1920')),
        new Record('LastNameThree', 'FirstNameThree', 'male', 'blue', new Date('10/13/1921'))
    ];
    let formats: KeyStringValueString = {
        'pipe': '|',
        'comma': ',',
        'space': ' '
    };
    let formatNames = Object.keys(formats);
    for (let i = 0; i < formatNames.length; i++) {
        let formatName = formatNames[i];
        let format = formats[formatName];

        // Actual test
        it(`Test promise resolves to array of Record objects when ${formatName} is used`, () => {
            let fsMock: FsInterface = <FsInterface>{};
            fsMock.exists = sinon.stub().resolves(true);
            fsMock.readFile = sinon.stub().resolves(new Buffer(
                `LastNameOne ${format} FirstNameOne ${format} male ${format} red ${format} 10/13/1919\n` +
                `LastNameTwo ${format} FirstNameTwo ${format} female | green ${format} 10/13/1920\n` +
                `LastNameThree ${format} FirstNameThree ${format} male ${format} blue ${format} 10/13/1921\n`,
                'utf-8'
            ));
            let inputReader = new InputReader(loggerMock, fsMock);
            return inputReader
                .read('dummy-file', formatName)
                .then((actual: Record[]) => {
                    chai.expect(actual).deep.equal(expected);
                });
        });
    }

});
