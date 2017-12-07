export default class Record {
    constructor(
        private firstName: string,
        private lastName: string,
        private gender: 'male'|'female',
        private favoriteColor: string,
        private birthday: Date
    ) {}
}