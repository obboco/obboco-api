import { PartnerGetBySubdomainController } from './../Infrastructure/Web/Partner/PartnerGetBySubdomainController';
import { PartnerGetByEmailController } from './../Infrastructure/Web/Partner/PartnerGetByEmailController';
import { PartnerPostController } from './../Infrastructure/Web/Partner/PartnerPostController';
import { PartnerGetController } from './../Infrastructure/Web/Partner/PartnerGetController';
import { validateMiddleware } from './Validator/validateMiddleware';
import { ulidValidator } from './Validator/ulidValidator';
import { Router, Request, Response } from 'express';
import { param, body } from 'express-validator';

export const register = (router: Router) => {
  router.get(
    '/partner/:partner_id',
    param('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const partnerGetController: PartnerGetController =
        new PartnerGetController();
      partnerGetController.run(req, res);
    }
  );

  router.post(
    '/partner',
    body('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('email').isEmail(),
    body('given_name')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 }),
    body('family_name')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 }),
    body('picture')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 }),
    body('locale').isString().isLength({ min: 1, max: 255 }),
    body('subscription_plan').isString().isLength({ min: 1, max: 255 }),
    body('subdomain')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 }),
    validateMiddleware,
    (req: Request, res: Response) => {
      const partnerPostController: PartnerPostController =
        new PartnerPostController();
      partnerPostController.run(req, res);
    }
  );

  router.get(
    '/partner/email/:email',
    param('email').isEmail(),
    validateMiddleware,
    (req: Request, res: Response) => {
      const partnerGetByEmailController: PartnerGetByEmailController =
        new PartnerGetByEmailController();
      partnerGetByEmailController.run(req, res);
    }
  );

  router.get(
    '/partner/subdomain/:subdomain',
    param('subdomain').isString().isLength({ min: 1, max: 255 }),
    validateMiddleware,
    (req: Request, res: Response) => {
      const partnerGetBySubdomainController: PartnerGetBySubdomainController =
        new PartnerGetBySubdomainController();
      partnerGetBySubdomainController.run(req, res);
    }
  );
};
