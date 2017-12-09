import Record from "./Record";
import RecordSorter from "./RecordSorter";

export default class RecordService {

    private records: Record[] = [];

    constructor(
        private recordSorter: RecordSorter
    ) {}

    add(record: Record): void {
        this.records.push(record);
    }

    getAllSortByGender(): Record[] {
        return this.recordSorter.sort(this.records, 'gender');
    }

    getAllSortByBirthday(): Record[] {
        return this.recordSorter.sort(this.records, 'birthday');
    }

    getAllSortByName(): Record[] {
        return this.recordSorter.sort(this.records, 'name');
    }
}