import {Gender, genders} from "../util/Definitions";

/**
 * Single record domain entity
 */
export default class Record {
    constructor(
        private _firstName: string,
        private _lastName: string,
        private _gender: Gender,
        private _favoriteColor: string,
        private _birthday: string
    ) {
        // validate gender
        if (!~genders.indexOf(_gender)) {
            throw new Error(`Gender must be either "female" or "male", "${_gender}" is provided`);
        }

        // validate birthday
        let match: any = _birthday.match(/^(\d\d)\/(\d\d)\/(\d\d\d\d)$/);
        let date = new Date(_birthday);
        if (
            !match ||
            parseInt(match[1]) !== date.getMonth() + 1 ||
            parseInt(match[2]) !== date.getDate() ||
            parseInt(match[3]) !== date.getFullYear()
        ) {
            throw new Error(`Birthday in a wrong format, MM/DD/YYYY is expected`);
        }
    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }

    get gender(): Gender {
        return this._gender;
    }

    get favoriteColor(): string {
        return this._favoriteColor;
    }

    get birthday(): string {
        return this._birthday;
    }
}