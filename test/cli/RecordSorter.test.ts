import * as chai from 'chai';
import * as sinon from 'sinon';
import loggerMock from '../mock/logger';
import RecordSorter from "../../src/app/RecordSorter";
import Record from "../../src/app/Record";

describe('Test RecordSorter', () => {

    it('Test sorting by gender and last name', () => {
        let recordSorter: RecordSorter = new RecordSorter(loggerMock);
        let r1 = new Record('LastName2', 'FirstName2', 'male', 'red', '10/13/1920');
        let r2 = new Record('LastName3', 'FirstName3', 'female', 'green', '10/13/1920');
        let r3 = new Record('LastName1', 'FirstName1', 'male', 'blue', '10/13/1920');
        let input: Record[] = [
            r1,
            r2,
            r3
        ];
        let expected: Record[] = [
            r2,
            r3,
            r1
        ];
        let output: Record[] = recordSorter.sort(input, 'gender');
        chai
            .expect(output)
            .deep.equals(expected);
    });

    it('Test sorting by birthday', () => {
        let recordSorter: RecordSorter = new RecordSorter(loggerMock);
        let r1 = new Record('LastName1', 'FirstName1', 'male', 'red', '10/13/1921');
        let r2 = new Record('LastName1', 'FirstName1', 'male', 'green', '10/13/1920');
        let r3 = new Record('LastName1', 'FirstName1', 'male', 'blue', '10/13/1922');
        let input: Record[] = [
            r1,
            r2,
            r3
        ];
        let expected: Record[] = [
            r2,
            r1,
            r3
        ];
        let output: Record[] = recordSorter.sort(input, 'birthday');
        chai
            .expect(output)
            .deep.equals(expected);
    });

    it('Test sorting by name', () => {
        let recordSorter: RecordSorter = new RecordSorter(loggerMock);
        let r1 = new Record('LastName2', 'FirstName2', 'female', 'red', '10/13/1920');
        let r2 = new Record('LastName3', 'FirstName3', 'female', 'green', '10/13/1920');
        let r3 = new Record('LastName1', 'FirstName1', 'female', 'blue', '10/13/1920');
        let input: Record[] = [
            r1,
            r2,
            r3
        ];
        let expected: Record[] = [
            r2,
            r1,
            r3
        ];
        let output: Record[] = recordSorter.sort(input, 'name');
        chai
            .expect(output)
            .deep.equals(expected);
    });

    it('Test exception is thrown if sort type is invalid', () => {
        let recordSorter: RecordSorter = new RecordSorter(loggerMock);
        chai
            .expect(recordSorter.sort.bind(recordSorter, [], 'whatever'))
            .throw('Invalid sort type: whatever');
    });

});
