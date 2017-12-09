import Record from "../app/Record";

export default class ResponseGenerator {

    error(message: string): any {
        return {"error": message};
    }

    singleRecord(record: Record): any {
        return {
            firstName: record.firstName,
            lastName: record.lastName,
            gender: record.gender,
            favoriteColor: record.favoriteColor,
            birthday: record.birthday
        };
    }

    multipleRecords(records: Record[]): any {
        let res: any[] = [];
        records.forEach((record: Record) => {
            res.push({
                firstName: record.firstName,
                lastName: record.lastName,
                gender: record.gender,
                favoriteColor: record.favoriteColor,
                birthday: record.birthday
            });
        });
        return res;
    }
}