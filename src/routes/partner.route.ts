import { Router, Request, Response } from 'express';
import { param, body } from 'express-validator';
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

  const partnerPostController = container.get(
    'Infrastructure.Web.Partner.PartnerPostController'
  );
  router.post(
    '/partner',
    body('email').isEmail(),
    body('given_name').isString().isLength({ min: 1, max: 255 }),
    body('family_name').isString().isLength({ min: 1, max: 255 }),
    body('picture').isString().isLength({ min: 1, max: 255 }),
    body('locale').isString().isLength({ min: 1, max: 255 }),
    body('subscription_plan').isString().isLength({ min: 1, max: 255 }),
    body('subdomain').isString().isLength({ min: 1, max: 255 }),
    (req: Request, res: Response) => partnerPostController.run(req, res)
  );

  const partnerGetByEmailController = container.get(
    'Infrastructure.Web.Partner.PartnerGetByEmailController'
  );
  router.get(
    '/partner/email/:email',
    param('email').isEmail(),
    (req: Request, res: Response) => partnerGetByEmailController.run(req, res)
  );

  const partnerGetBySubdomainController = container.get(
    'Infrastructure.Web.Partner.PartnerGetBySubdomainController'
  );
  router.get(
    '/partner/subdomain/:subdomain',
    param('subdomain').isString().isLength({ min: 1, max: 255 }),
    (req: Request, res: Response) =>
      partnerGetBySubdomainController.run(req, res)
  );
};
