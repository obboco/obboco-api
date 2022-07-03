import { GuestPassMysqlRepository } from './../../Repository/guestPassMysqlRepository';
import { GuestPass } from './../../../Domain/guestPass';
import { GetGuestPassByGuest } from './../../../Application/GuestPass/getGuestPassByGuest';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class GuestPassGetByGuestController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }
    const getGuestsPassByGuest: GetGuestPassByGuest = new GetGuestPassByGuest(
      new GuestPassMysqlRepository()
    );
    const guestPasses: GuestPass[] = await getGuestsPassByGuest.make({
      guest_id: req.params.guest_id
    });
    res.status(httpStatus.OK).send(this.toResponse(guestPasses));
  }

  private toResponse(guestPasses: GuestPass[]): any {
    return {
      data: guestPasses.map((guestPass: GuestPass) => {
        return guestPass.toPrimitives();
      })
    };
  }
}
