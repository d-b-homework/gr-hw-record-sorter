import {OutputSort, outputSorts} from "../util/Definitions";
import Record from "../app/Record";
import Logger from "../util/Logger";

export default class RecordSorter {
    constructor(
        private logger: Logger
    ) {}

    sort(records: Record[], sort: OutputSort) {
        if (!~outputSorts.indexOf(sort)) {
            throw new Error(`Invalid sort type: ${sort}`);
        }
        return records.sort((r1: Record, r2: Record) => {
            switch (sort) {
                case 'gender':
                    if (r1.gender === r2.gender) {
                        return r1.lastName < r2.lastName ? -1 : r1.lastName > r2.lastName ? 1 : 0;
                    } else {
                        return r1.gender === 'female' ? -1 : 1;
                    }
                case 'birthday':
                    let bd1 = new Date(r1.birthday);
                    let bd2 = new Date(r2.birthday);
                    if (bd1 < bd2) {
                        return -1;
                    } else if (bd1 > bd2) {
                        return 1;
                    } else {
                        return 0;
                    }
                case 'name':
                    if (r1.lastName < r2.lastName) {
                        return 1;
                    } else if (r1.lastName > r2.lastName) {
                        return -1;
                    } else {
                        return 0;
                    }
            }
        });
    }
}