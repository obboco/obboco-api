import { Router, Request, Response } from 'express';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const healthcheckController = container.get(
    'Infrastructure.Web.Healthcheck.HealthCheckController'
  );
  router.get('/healthcheck', (req: Request, res: Response) =>
    healthcheckController.run(req, res)
  );
};
