import Record from "../app/Record";

export default class ResponseGenerator {

    error(message: string): any {
        return {"error": message};
    }

    singleRecord(record: Record): any {
        return {"single": "record"};
    }

    multipleRecords(record: Record[]): any {
        return {"multiple": "records"};
    }
}