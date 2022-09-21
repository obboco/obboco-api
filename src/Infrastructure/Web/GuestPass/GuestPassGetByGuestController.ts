import { GuestPassMysqlRepository } from '../../Repository/GuestPassMysqlRepository';
import { GuestPass } from '../../../Domain/GuestPass';
import { GetGuestPassByGuest } from '../../../Application/GuestPass/GetGuestPassByGuest';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class GuestPassGetByGuestController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
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
