import {Request, Response} from "express";
import RequestParser from "../RequestParser";
import ResponseGenerator from "../ResponseGenerator";
import RecordService from "../../app/RecordService";
import Record from "../../app/Record";

export default class PostRecord {

    constructor(
        private requestParser: RequestParser,
        private recordService: RecordService,
        private responseGenerator: ResponseGenerator
    ) {}

    handler(req: Request, res: Response): void {
        let record: Record;
        try {
            record = this.requestParser.parseRecord(req.body);
        } catch (err) {
            res.statusCode = 400;
            res.json(
                this.responseGenerator.error(err.message)
            );
            return;
        }
        this.recordService.add(record);
        res.json(
            this.responseGenerator.singleRecord(record)
        );
    }
}
