import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { GuestMysqlRepository } from '../../Repository/guestMysqlRepository';
import { UpdateGuest } from '../../../Application/Guest/updateGuest';

export class GuestPutController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const updateGuest: UpdateGuest = new UpdateGuest(
      new GuestMysqlRepository()
    );
    updateGuest.make({
      guest_id: req.body.guest_id,
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
