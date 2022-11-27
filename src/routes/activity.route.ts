import {ActivityPostImageController} from './../Infrastructure/Web/Activity/ActivityPostImageController';
import {ActivityDeleteController} from './../Infrastructure/Web/Activity/ActivityDeleteController';
import {ActivityGetController} from './../Infrastructure/Web/Activity/ActivityGetController';
import {ActivityGetByPartnerController} from './../Infrastructure/Web/Activity/ActivityGetByPartnerController';
import {ActivityPutController} from './../Infrastructure/Web/Activity/ActivityPutController';
import {ActivityPostController} from './../Infrastructure/Web/Activity/ActivityPostController';
import {validateMiddleware} from './Validator/validateMiddleware';
import {ulidValidator} from './Validator/ulidValidator';
import {uploadFiles} from './../Infrastructure/S3/s3';
import {Router, Request, Response} from 'express';
import {param, body} from 'express-validator';

export const register = (router: Router) => {
  router.post(
    '/activity',
    body('activity_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    body('title').isString().isLength({min: 1, max: 255}),
    body('description').isString().isLength({min: 1, max: 255}),
    body('price').isNumeric(),
    body('currency').isString().isLength({min: 1, max: 255}),
    body('location').optional({nullable: true}).isString().isLength({min: 1, max: 255}),
    body('partner_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    body('image_id')
      .optional({nullable: true})
      .isString()
      .isLength({min: 1, max: 255})
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const activityPostController: ActivityPostController = new ActivityPostController();
      activityPostController.run(req, res);
    }
  );

  router.put(
    '/activity',
    body('activity_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    body('title').isString().isLength({min: 1, max: 255}),
    body('description').isString().isLength({min: 1, max: 255}),
    body('price').isNumeric(),
    body('currency').isString().isLength({min: 1, max: 255}),
    body('location').optional({nullable: true}).isString().isLength({min: 1, max: 255}),
    body('image_id')
      .optional({nullable: true})
      .isString()
      .isLength({min: 1, max: 255})
      .custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const activityPutController: ActivityPutController = new ActivityPutController();
      activityPutController.run(req, res);
    }
  );

  router.get(
    '/activity/partner/:partner_id',
    param('partner_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const activityGetByPartnerController: ActivityGetByPartnerController =
        new ActivityGetByPartnerController();
      activityGetByPartnerController.run(req, res);
    }
  );

  router.get(
    '/activity/:activity_id',
    param('activity_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const activityGetController: ActivityGetController = new ActivityGetController();
      activityGetController.run(req, res);
    }
  );

  router.delete(
    '/activity/:activity_id',
    param('activity_id').isString().isLength({min: 1, max: 255}).custom(ulidValidator),
    validateMiddleware,
    (req: Request, res: Response) => {
      const activityDeleteController: ActivityDeleteController =
        new ActivityDeleteController();
      activityDeleteController.run(req, res);
    }
  );

  router.post('/activity/image', uploadFiles, (req: Request, res: Response) => {
    const activityPostImageController: ActivityPostImageController =
      new ActivityPostImageController();
    activityPostImageController.run(req, res);
  });
};
