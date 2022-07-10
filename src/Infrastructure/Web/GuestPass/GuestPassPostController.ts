import { GuestPassMysqlRepository } from './../../Repository/guestPassMysqlRepository';
import { CreateGuestPass } from './../../../Application/GuestPass/createGuestPass';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';
import { PassMysqlRepository } from '../../Repository/passMysqlRepository';

export class GuestPassPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const createGuestPass: CreateGuestPass = new CreateGuestPass(
      new GuestPassMysqlRepository(),
      new PassMysqlRepository()
    );
    createGuestPass.make({
      guest_pass_id: req.body.guest_pass_id,
      pass_id: req.body.pass_id,
      guest_id: req.body.guest_id,
      quantity: req.body.quantity,
      price: req.body.price,
      currency: req.body.currency
    });
    res.status(httpStatus.OK).send(this.toResponse());
  }

  private toResponse(): any {
    return {
      data: 'ok'
    };
  }
}
