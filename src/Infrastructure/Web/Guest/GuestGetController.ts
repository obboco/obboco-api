import { GetGuests } from './../../../Application/Guest/getGuests';
import { Guest } from '../../../Domain/guest';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';
import { GuestMysqlRepository } from '../../Repository/guestMysqlRepository';

export class GuestGetController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

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
