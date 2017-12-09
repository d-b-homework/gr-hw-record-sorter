import {Server, createServer} from "http";
import * as express from "express";
import {json as bodyParserJson} from "body-parser";
import PostRecord from "./endpoint/PostRecord";
import GetByGender from "./endpoint/GetByGender";
import GetByBirthday from "./endpoint/GetByBirthday";
import GetByName from "./endpoint/GetByName";

export default class App {
    private server: Server;

    constructor(
        private postRecord: PostRecord,
        private getByGender: GetByGender,
        private getByBirthday: GetByBirthday,
        private getByName: GetByName
    ) {}

    start(port: number): void {
        let e: express.Application = express();
        e.use(bodyParserJson());
        e.use('/', this.getRouter());

        this.server = createServer(e);
        this.server.on('error', this.onError.bind(this));
        this.server.on('listening', this.onListening.bind(this));
        this.server.listen(port);
    }

    private getRouter(): express.Router {
        let router = express.Router();
        router.post('/records', this.postRecord.handler);
        router.get('/records/gender', this.getByGender.handler);
        router.get('/records/birthday', this.getByBirthday.handler);
        router.get('/records/name', this.getByName.handler);
        return router;
    }

    /**
     * onError callback
     *
     * @param {NodeJS.ErrnoException} error
     */
    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') {
            throw error;
        }
        let port = this.server.address().port;
        switch(error.code) {
            case 'EACCES':
                console.error(`Port ${port} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`Port ${port} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * onListening callback
     */
    private onListening(): void {
        console.log(`Listening on ${this.server.address().port}`);
    }
}