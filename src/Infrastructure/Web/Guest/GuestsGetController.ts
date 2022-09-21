import { GetGuests } from '../../../Application/Guest/GetGuests';
import { Guest } from '../../../Domain/Guest';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { GuestMysqlRepository } from '../../Repository/GuestMysqlRepository';

export class GuestsGetController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const getGuests: GetGuests = new GetGuests(new GuestMysqlRepository());
    const guests: Guest[] = await getGuests.make({
      partner_id: req.params.partner_id
    });
    res.status(httpStatus.OK).send(this.toResponse(guests));
  }

  private toResponse(guests: Guest[]): any {
    return {
      data: guests.map((guest: Guest) => {
        return guest.toPrimitives();
      })
    };
  }
}
