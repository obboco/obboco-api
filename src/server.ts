import bodyParser from 'body-parser';
import compress from 'compression';
import errorHandler from 'errorhandler';
import express, {Request, Response} from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';
//import Logger from '../../../Contexts/Shared/domain/Logger';
import {registerRoutes} from './routes';
import * as MySQLHandler from './Infrastructure/Mysql/MysqlHandler';

export class Server {
  private express: express.Express;
  readonly port: string;
  //private logger: Logger;
  httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    const cors = require('cors');

    //this.logger = container.get('Shared.Logger');
    this.express = express();
    this.express.use(cors({credentials: true, origin: true}));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({action: 'deny'}));
    this.express.use(compress());
    const router = Router();
    router.use(errorHandler());
    this.express.use(router);
    registerRoutes(router);
    MySQLHandler.init();

    router.use((err: Error, req: Request, res: Response, next: Function) => {
      //this.logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        if (this.express.get('env') !== 'test') {
          console.log(
            `  Obboco API is running at http://localhost:${
              this.port
            } in ${this.express.get('env')} mode`
          );
          console.log('  Press CTRL-C to stop\n');
        }
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        MySQLHandler.stop();
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
