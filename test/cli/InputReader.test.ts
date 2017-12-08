import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import * as sinon from 'sinon';
import loggerMock from '../mock/logger';
import InputReader from "../../src/cli/InputReader";
import {FsInterface, fileFormats, FileFormat, InputFormat} from "../../src/util/Definitions";
import Record from "../../src/app/Record";

describe('Test InputReader', () => {

    it(`Test promise is rejected if input format is invalid`, () => {
        let fsMock: FsInterface = <FsInterface>{};
        let inputReader = new InputReader(loggerMock, fsMock);
        return chai
            .expect(inputReader.read('dummy-file', <InputFormat><any>'dummy-format'))
            .rejectedWith('Bad file format: dummy-format');
    });

    it(`Test promise is rejected if file is missing`, () => {
        let fsMock: FsInterface = <FsInterface>{};
        fsMock.exists = sinon.stub().resolves(false);
        let inputReader = new InputReader(loggerMock, fsMock);
        return chai
            .expect(inputReader.read('dummy-file', 'pipe'))
            .rejectedWith('File does\'t exist: dummy-file');
    });

    // Test promise resolves to array of Record objects (all 3 formats)
    let expected = [
        new Record('LastNameOne', 'FirstNameOne', 'male', 'red', '10/13/1919'),
        new Record('LastNameTwo', 'FirstNameTwo', 'female', 'green', '10/13/1920'),
        new Record('LastNameThree', 'FirstNameThree', 'male', 'blue', '10/13/1921')
    ];
    Object.keys(fileFormats).forEach((formatName: string) => {
        let format: FileFormat = fileFormats[<InputFormat>formatName];
        // Actual test
        it(`Test promise resolves to array of Record objects when ${formatName} is used`, () => {
            let fsMock: FsInterface = <FsInterface>{};
            fsMock.exists = sinon.stub().resolves(true);
            fsMock.readFile = sinon.stub().resolves(new Buffer(
                `LastNameOne ${format.separator} FirstNameOne ${format.separator} male ${format.separator} red ${format.separator} 10/13/1919\n` +
                ` \n` + // test empty lines ignored
                `LastNameTwo ${format.separator} FirstNameTwo ${format.separator} female ${format.separator} green ${format.separator} 10/13/1920\n` +
                `LastNameThree ${format.separator} FirstNameThree ${format.separator} male ${format.separator} blue ${format.separator} 10/13/1921\n`
            ));
            let inputReader = new InputReader(loggerMock, fsMock);
            return chai
                .expect(inputReader.read('dummy-file', format.name))
                .eventually.become(expected);
        });
    });

    it('Test promise is rejected if either line has a wrong amount of columns', () => {
        let fsMock: FsInterface = <FsInterface>{};
        fsMock.exists = sinon.stub().resolves(true);
        fsMock.readFile = sinon.stub().resolves(new Buffer(
            `LastNameOne | FirstNameOne | female | red | 10/13/1919\n` +
            `LastNameTwo | FirstNameTwo male | green | 10/13/1920\n`
        ));
        let inputReader = new InputReader(loggerMock, fsMock);
        return chai
            .expect(inputReader.read('dummy-file', 'pipe'))
            .rejectedWith('Line #2 has 4 columns instead of expected 5');
    });

    it('Test promise is rejected if gender has a wrong value', () => {
        let fsMock: FsInterface = <FsInterface>{};
        fsMock.exists = sinon.stub().resolves(true);
        fsMock.readFile = sinon.stub().resolves(new Buffer(
            `LastNameOne | FirstNameOne | female | red | 10/13/1919\n` +
            `LastNameTwo | FirstNameTwo | it | green | 10/13/1920\n`
        ));
        let inputReader = new InputReader(loggerMock, fsMock);
        return chai
            .expect(inputReader.read('dummy-file', 'pipe'))
            .rejectedWith('Line #2 has an error: Gender must be either "female" or "male", "it" is provided');
    });

    it('Test promise is rejected if birthday has a wrong date', () => {
        let fsMock: FsInterface = <FsInterface>{};
        fsMock.exists = sinon.stub().resolves(true);
        fsMock.readFile = sinon.stub().resolves(new Buffer(
            `LastNameOne | FirstNameOne | male | red | 10/13/1919\n` +
            `LastNameTwo | FirstNameTwo | female | green | Oct 13, 1920\n`
        ));
        let inputReader = new InputReader(loggerMock, fsMock);
        return chai
            .expect(inputReader.read('dummy-file', 'pipe'))
            .rejectedWith('Line #2 has an error: Birthday in a wrong format, MM/DD/YYYY is expected');
    });

});
