import {Server, createServer} from "http";
import * as express from "express";
import {json as bodyParserJson} from "body-parser";
import GetHelp from "./endpoint/GetHelp";
import PostRecord from "./endpoint/PostRecord";
import GetByGender from "./endpoint/GetByGender";
import GetByBirthday from "./endpoint/GetByBirthday";
import GetByName from "./endpoint/GetByName";
import Logger from "../util/Logger";

/**
 * Server application
 */
export default class App {
    private server: Server;

    constructor(
        private logger: Logger,
        private port: number,
        private getHelp: GetHelp,
        private postRecord: PostRecord,
        private getByGender: GetByGender,
        private getByBirthday: GetByBirthday,
        private getByName: GetByName
    ) {}

    /**
     * Entry point
     */
    start(): void {
        let e: express.Application = express();
        e.use(bodyParserJson());
        e.use('/', this.getRouter());

        this.server = createServer(e);
        this.server.on('error', this.onError.bind(this));
        this.server.on('listening', this.onListening.bind(this));
        this.server.listen(this.port);
    }

    private getRouter(): express.Router {
        let router = express.Router();
        router.get('/', this.getHelp.handler.bind(this.getHelp));
        router.post('/records', this.postRecord.handler.bind(this.postRecord));
        router.get('/records/gender', this.getByGender.handler.bind(this.getByGender));
        router.get('/records/birthday', this.getByBirthday.handler.bind(this.getByBirthday));
        router.get('/records/name', this.getByName.handler.bind(this.getByName));
        return router;
    }

    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') {
            throw error;
        }
        switch(error.code) {
            case 'EACCES':
                this.logger.error(`Port ${this.port} requires elevated privileges`);
                process.exit();
                break;
            case 'EADDRINUSE':
                this.logger.error(`Port ${this.port} is already in use`);
                process.exit();
                break;
            default:
                throw error;
        }
    }

    private onListening(): void {
        console.log(`Listening on ${this.port}`);
    }
}
