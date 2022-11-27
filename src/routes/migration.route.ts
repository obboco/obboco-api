import { MysqlMigrationController } from './../Infrastructure/Web/Migration/MysqlMigrationController';
import { Router, Request, Response } from 'express';

export const register = (router: Router) => {
  router.get('/migrate', (req: Request, res: Response) => {
    const mysqlMigrationController: MysqlMigrationController =
      new MysqlMigrationController();
    mysqlMigrationController.run(req, res);
  });
};
