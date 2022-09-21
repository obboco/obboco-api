import { CreateGuest } from '../../../Application/Guest/CreateGuest';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { GuestMysqlRepository } from '../../Repository/GuestMysqlRepository';

export class GuestPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
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
