import { Router, Request, Response } from 'express';
import { param } from 'express-validator';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const partnerGetController = container.get(
    'Infrastructure.Web.Partner.PartnerGetController'
  );
  router.get(
    '/partner/:id',
    param('id').isString().isLength({ min: 1, max: 255 }),
    (req: Request, res: Response) => partnerGetController.run(req, res)
  );
};
