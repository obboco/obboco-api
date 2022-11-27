import { StatusController } from './../Infrastructure/Web/Status/StatusController';
import { Router, Request, Response } from 'express';

export const register = (router: Router) => {
  router.get('/status', (req: Request, res: Response) => {
    const statusController: StatusController = new StatusController();
    statusController.run(req, res);
  });
};
