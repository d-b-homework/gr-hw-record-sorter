import {Request, Response} from "express";
import ResponseGenerator from "../ResponseGenerator";
import RecordService from "../../app/RecordService";
import Record from "../../app/Record";

export default class GetByBirthday {

    constructor(
        private recordService: RecordService,
        private responseGenerator: ResponseGenerator
    ) {}

    handler(req: Request, res: Response): void {
        res.json(
            this.responseGenerator.multipleRecords(
                this.recordService.getAllSortByBirthday()
            )
        );
    }
}