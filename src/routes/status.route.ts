import { Router, Request, Response } from 'express';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const statusController = container.get(
    'Infrastructure.Web.Status.StatusController'
  );
  router.get('/status', (req: Request, res: Response) =>
    statusController.run(req, res)
  );
};
