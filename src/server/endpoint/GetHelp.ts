import {Request, Response} from "express";
import ResponseGenerator from "../ResponseGenerator";
import RecordService from "../../app/RecordService";
import Record from "../../app/Record";

/**
 * Get help endpoint handler
 */
export default class GetHelp {

    handler(req: Request, res: Response): void {
        res.json(
            {
                ['POST http://' + req.headers.host + '/records']: 'Post a single data line in JSON',
                ['GET http://' + req.headers.host + '/records/gender']: 'Returns records sorted by gender',
                ['POST http://' + req.headers.host + '/records/birthday']: 'Returns records sorted by birthday',
                ['POST http://' + req.headers.host + '/records/name']: 'Returns records sorted by name'
            }
        );
    }
}