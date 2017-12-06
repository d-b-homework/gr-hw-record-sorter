import {Server} from "http";
import ExpressWrapper from "./ExpressWrapper";

export default class App {
    private server: Server;

    constructor(
        private expressWrapper: ExpressWrapper,
        private createServer: Function
    ) {}

    start(port: number): void {
        this.server = this.createServer(this.expressWrapper.express);
        this.server.on('error', this.onError.bind(this));
        this.server.on('listening', this.onListening.bind(this));
        this.server.listen(port);
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