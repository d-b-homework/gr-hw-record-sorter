import Record from "../app/Record";

/**
 * Generate response body
 */
export default class ResponseGenerator {

    /**
     * Generate error response
     */
    error(message: string): any {
        return {"error": message};
    }

    /**
     * Generate single record response
     */
    singleRecord(record: Record): any {
        return {
            firstName: record.firstName,
            lastName: record.lastName,
            gender: record.gender,
            favoriteColor: record.favoriteColor,
            birthday: record.birthday
        };
    }

    /**
     * Generate list of records response
     */
    multipleRecords(records: Record[]): any {
        let res: any[] = [];
        records.forEach((record: Record) => {
            res.push(this.singleRecord(record));
        });
        return res;
    }
}