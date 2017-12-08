import * as chai from 'chai';
import * as sinon from 'sinon';
import loggerMock from '../mock/logger';
import OutputWriter from "../../src/cli/OutputWriter";
import {FileFormat, fileFormats, InputFormat} from "../../src/util/Definitions";
import Record from "../../src/app/Record";

describe('Test OutputWriter', () => {

    it('Test exception is thrown if sort type is invalid', () => {
        let writeLn = sinon.stub();
        let outputWriter: OutputWriter = new OutputWriter(loggerMock, writeLn);
        chai
            .expect(outputWriter.write.bind(outputWriter, [], 'whatever'))
            .throw('Bad file format: whatever');
    });

    Object.keys(fileFormats).forEach((formatName: InputFormat) => {
        let format: FileFormat = fileFormats[formatName];

        // Actual test
        it(`Test output when ${formatName} is used`, () => {
            let writeLn = sinon.spy();
            let outputWriter: OutputWriter = new OutputWriter(loggerMock, writeLn);
            let data: Record[] = [
                new Record('LastNameOne', 'FirstNameOne', 'male', 'red', '10/13/1919'),
                new Record('LastNameTwo', 'FirstNameTwo', 'female', 'green', '10/13/1920')
            ];
            outputWriter.write(data, formatName);
            chai
                .expect(writeLn.getCall(0).args[0])
                .equals(`LastNameOne${format.separator}FirstNameOne${format.separator}male${format.separator}red${format.separator}10/13/1919`);
            chai
                .expect(writeLn.getCall(1).args[0])
                .equals(`LastNameTwo${format.separator}FirstNameTwo${format.separator}female${format.separator}green${format.separator}10/13/1920`);
        });

    });

});
