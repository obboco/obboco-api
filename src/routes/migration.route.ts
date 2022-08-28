import { Router, Request, Response } from 'express';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const mysqlMigrationController = container.get(
    'Infrastructure.Web.Migration.MysqlMigrationController'
  );
  router.get('/migrate', (req: Request, res: Response) =>
    mysqlMigrationController.run(req, res)
  );
};
