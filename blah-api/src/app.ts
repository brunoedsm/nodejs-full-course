import { join } from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Logger from './core/logger';
import { ConsoleColor } from './core/console';
import router from './routes';
import TokenMiddleware from './core/auth/token.middleware';

export class App {

    public static run(port: number): void {
        const app = new App().express;
        app.listen(port, () => Logger.log(`--> App started at port ${port}`, ConsoleColor.FgGreen));
    }

    public express: express.Application;

    constructor() {
        this.express = express();

        // setup view engine
        this.setupViewEngine();

        // setup express
        this.setupExpress();

        // setup logger
        this.setupLogger();

        // routes
        this.routes();
    }

    private setupViewEngine(): void {
        this.express.set('views', join(__dirname, '../views'));
        this.express.set('view engine', 'ejs');
    }

    private setupExpress(): void {
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));
    }

    private setupLogger(): void {
        this.express.use(Logger.logRequestsMiddleware);
    }

    private routes(): void {
        this.express.use(express.static(__dirname + '/../public'))
        this.express.use(TokenMiddleware.tokenVerify);
        this.express.use(router);
    }
}