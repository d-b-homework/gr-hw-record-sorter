import {Gender, genders} from "../util/Definitions";

export default class Record {
    constructor(
        private firstName: string,
        private lastName: string,
        private gender: Gender,
        private favoriteColor: string,
        private birthday: string
    ) {
        // validate gender
        if (!~genders.indexOf(gender)) {
            throw new Error(`Gender must be either "female" or "male", "${gender}" is provided`);
        }

        // validate birthday
        let match: any = birthday.match(/^(\d\d)\/(\d\d)\/(\d\d\d\d)$/);
        let date = new Date(birthday);
        if (
            !match ||
            parseInt(match[1]) !== date.getMonth() + 1 ||
            parseInt(match[2]) !== date.getDate() ||
            parseInt(match[3]) !== date.getFullYear()
        ) {
            throw new Error(`Birthday in a wrong format, MM/DD/YYYY is expected`);
        }
    }
}