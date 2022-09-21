import { GetGuest } from '../../../Application/Guest/GetGuest';
import { Guest } from '../../../Domain/Guest';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { GuestMysqlRepository } from '../../Repository/GuestMysqlRepository';

export class GuestGetController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const getGuest: GetGuest = new GetGuest(new GuestMysqlRepository());
    const guest: Guest = await getGuest.make({
      guest_id: req.params.guest_id
    });

    if (!guest) {
      res.status(httpStatus.NOT_FOUND).send({ data: {} });
      return;
    }
    res.status(httpStatus.OK).send(this.toResponse(guest));
  }

  private toResponse(guest: Guest): any {
    return {
      data: guest.toPrimitives()
    };
  }
}
