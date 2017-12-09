import * as chai from 'chai';
import ResponseGenerator from "../../src/server/ResponseGenerator";
import Record from "../../src/app/Record";

describe('Test ResponseGenerator', () => {

    it('Test error message response', () => {
        let responseGenerator = new ResponseGenerator();
        chai
            .expect(responseGenerator.error('message'))
            .deep.equals(
                {error: 'message'}
            );
    });

    it('Test singleRecord response', () => {
        let responseGenerator = new ResponseGenerator();
        chai
            .expect(responseGenerator.singleRecord(
                new Record('firstName', 'lastName', 'female', 'red', '10/13/1920')
            ))
            .deep.equals(
                {
                    firstName: 'firstName',
                    lastName: 'lastName',
                    gender: 'female',
                    favoriteColor: 'red',
                    birthday: '10/13/1920'
                }
            );
    });

    it('Test multipleRecords response', () => {
        let responseGenerator = new ResponseGenerator();
        chai
            .expect(responseGenerator.multipleRecords(
                [new Record('firstName', 'lastName', 'female', 'red', '10/13/1920')]
            ))
            .deep.equals(
                [
                    {
                        firstName: 'firstName',
                        lastName: 'lastName',
                        gender: 'female',
                        favoriteColor: 'red',
                        birthday: '10/13/1920'
                    }
                ]
            );
    });

});