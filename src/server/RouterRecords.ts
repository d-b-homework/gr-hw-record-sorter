import * as express from "express";
import {Response} from "../util/Definitions";

export default class RouterRecords {

    static create(): express.Router {
        let router = express.Router();
        router.get('/', RouterRecords.hello.bind(null));
        return router;
    }

    static hello(req: Request, res: Response): void {
        res.json({
            message: 'Hello World!!!!'
        });
    }
}
