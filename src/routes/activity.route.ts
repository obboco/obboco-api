import { validateMiddleware } from './Validator/validateMiddleware';
import { ulidValidator } from './Validator/ulidValidator';
import { uploadFiles } from './../Infrastructure/S3/s3';
import { Router, Request, Response } from 'express';
import { param, body } from 'express-validator';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const activityPostController = container.get(
    'Infrastructure.Web.Activity.ActivityPostController'
  );
  router.post(
    '/activity',
    body('activity_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('title').isString().isLength({ min: 1, max: 255 }),
    body('description').isString().isLength({ min: 1, max: 255 }),
    body('price').isNumeric(),
    body('currency').isString().isLength({ min: 1, max: 255 }),
    body('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('image_id')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => activityPostController.run(req, res)
  );

  const activityPutController = container.get(
    'Infrastructure.Web.Activity.ActivityPutController'
  );
  router.put(
    '/activity',
    body('activity_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    body('title').isString().isLength({ min: 1, max: 255 }),
    body('description').isString().isLength({ min: 1, max: 255 }),
    body('price').isNumeric(),
    body('currency').isString().isLength({ min: 1, max: 255 }),
    body('image_id')
      .optional({ nullable: true })
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => activityPutController.run(req, res)
  );

  const activityGetByPartnerController = container.get(
    'Infrastructure.Web.Activity.ActivityGetByPartnerController'
  );
  router.get(
    '/activity/partner/:partner_id',
    param('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) =>
      activityGetByPartnerController.run(req, res)
  );

  const activityGetController = container.get(
    'Infrastructure.Web.Activity.ActivityGetController'
  );
  router.get(
    '/activity/:activity_id',
    param('activity_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => activityGetController.run(req, res)
  );

  const activityDeleteController = container.get(
    'Infrastructure.Web.Activity.ActivityDeleteController'
  );
  router.delete(
    '/activity/:activity_id',
    param('activity_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => activityDeleteController.run(req, res)
  );

  const activityPostImageController = container.get(
    'Infrastructure.Web.Activity.ActivityPostImageController'
  );
  router.post('/activity/image', uploadFiles, (req: Request, res: Response) =>
    activityPostImageController.run(req, res)
  );
};
