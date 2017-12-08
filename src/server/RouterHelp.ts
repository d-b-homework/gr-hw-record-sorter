import * as express from "express";
import {Response} from "../util/Definitions";

export default class RouterHelp {
    static create(recordsPathPrefix: string): express.Router {
        let router = express.Router();
        router.get('/', RouterHelp.outputHelp.bind(null, recordsPathPrefix));
        return router;
    }

    static outputHelp(recordsPathPrefix: string, req: Request, res: Response): void {
        res.json({
            ["POST " + recordsPathPrefix]: "post a single data line in any of the 3 formats supported by your existing code",
            ["GET " + recordsPathPrefix + "/gender"]: "returns records sorted by gender",
            ["GET " + recordsPathPrefix + "/birthdate"]: "returns records sorted by birthdate",
            ["GET " + recordsPathPrefix + "/name"]: "returns records sorted by birthdate"
        });
    }
}
