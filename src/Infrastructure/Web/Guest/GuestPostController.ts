import { CreateGuest } from './../../../Application/Guest/createGuest';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';
import { GuestMysqlRepository } from '../../Repository/guestMysqlRepository';

export class GuestPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const createGuest: CreateGuest = new CreateGuest(
      new GuestMysqlRepository()
    );
    createGuest.make({
      guest_id: req.body.guest_id,
      partner_id: req.body.partner_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone
    });
    res.status(httpStatus.OK).send(this.toResponse());
  }

  private toResponse(): any {
    return {
      data: 'ok'
    };
  }
}
