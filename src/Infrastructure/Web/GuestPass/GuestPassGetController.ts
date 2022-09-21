import { GuestPassMysqlRepository } from '../../Repository/GuestPassMysqlRepository';
import { GuestPass } from '../../../Domain/GuestPass';
import { GetGuestPass } from '../../../Application/GuestPass/GetGuestPass';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class GuestPassGetController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const getGuestsPass: GetGuestPass = new GetGuestPass(
      new GuestPassMysqlRepository()
    );
    const guestPass: GuestPass = await getGuestsPass.make({
      guest_pass_id: req.params.guest_pass_id
    });

    if (!guestPass) {
      res.status(httpStatus.NOT_FOUND).send({ data: {} });
      return;
    }
    res.status(httpStatus.OK).send(this.toResponse(guestPass));
  }

  private toResponse(guestPass: GuestPass): any {
    return {
      data: guestPass.toPrimitives()
    };
  }
}
