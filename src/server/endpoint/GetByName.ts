import {Request, Response} from "express";
import ResponseGenerator from "../ResponseGenerator";
import RecordService from "../../app/RecordService";

/**
 * Get records by name endpoint handler
 */
export default class GetByName {

    constructor(
        private recordService: RecordService,
        private responseGenerator: ResponseGenerator
    ) {}

    handler(req: Request, res: Response): void {
        res.json(
            this.responseGenerator.multipleRecords(
                this.recordService.getAllSortByName()
            )
        );
    }
}