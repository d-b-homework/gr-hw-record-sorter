import * as chai from 'chai';
import RequestParser from "../../src/server/RequestParser";
import Record from "../../src/app/Record";

describe('Test RequestParser', () => {

    it('Test parseRecord succeeds when input is as expected', () => {
        let input = {
            firstName: 'firstName',
            lastName: 'lastName',
            gender: 'female',
            favoriteColor: 'red',
            birthday: '10/13/1920'
        };
        let requestParser = new RequestParser();
        chai
            .expect(requestParser.parseRecord(input))
            .deep.equals(new Record('firstName', 'lastName', 'female', 'red', '10/13/1920'));
    });

    it('Test parseRecord throws exception when input is as malformed', () => {
        let requestParser = new RequestParser();
        chai
            .expect(requestParser.parseRecord.bind(requestParser, null))
            .throw(`Valid object is expected`);
        chai
            .expect(requestParser.parseRecord.bind(requestParser, {}))
            .throw(`Valid object is expected`);
    });

    it('Test parseRecord throws exception when record cannot be created using provided input', () => {
        let requestParser = new RequestParser();
        let input = {
            firstName: 'firstName',
            lastName: 'lastName',
            gender: 'female',
            favoriteColor: 'red',
            birthday: 'Oct 13, 1920'
        };
        chai
            .expect(requestParser.parseRecord.bind(requestParser, input))
            .throw(`Birthday in a wrong format, MM/DD/YYYY is expected`);
    });

});