import { Uuid } from './../Domain/Shared/uuid';
import { Router, Request, Response } from 'express';
import { param, body } from 'express-validator';
import { uploadFiles } from '../Infrastructure/s3';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const activityPostController = container.get(
    'Infrastructure.Web.Activity.ActivityPostController'
  );
  router.post(
    '/activity',
    body('title').isString().isLength({ min: 1, max: 255 }),
    body('description').isString().isLength({ min: 1, max: 255 }),
    body('partner_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom((value) => {
        try {
          Uuid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    body('image_id')
      .optional()
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom((value) => {
        try {
          Uuid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
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
      .custom((value) => {
        try {
          Uuid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    body('title').isString().isLength({ min: 1, max: 255 }),
    body('description').isString().isLength({ min: 1, max: 255 }),
    body('image_id')
      .optional()
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom((value) => {
        try {
          Uuid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    (req: Request, res: Response) => activityPutController.run(req, res)
  );

  const activityGetByUserController = container.get(
    'Infrastructure.Web.Activity.ActivityGetByUserController'
  );
  router.get(
    '/activity/user/:user_id',
    param('user_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom((value) => {
        try {
          Uuid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    (req: Request, res: Response) => activityGetByUserController.run(req, res)
  );

  const activityGetController = container.get(
    'Infrastructure.Web.Activity.ActivityGetController'
  );
  router.get(
    '/activity/:activity_id',
    param('activity_id')
      .isString()
      .isLength({ min: 1, max: 255 })
      .custom((value) => {
        try {
          Uuid.fromPrimitives(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    (req: Request, res: Response) => activityGetController.run(req, res)
  );

  const activityPostImageController = container.get(
    'Infrastructure.Web.Activity.ActivityPostImageController'
  );
  router.post('/activity/image', uploadFiles, (req: Request, res: Response) =>
    activityPostImageController.run(req, res)
  );
};
