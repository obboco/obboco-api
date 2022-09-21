import { UpdateBooking } from '../../../Application/Booking/UpdateBooking';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class BookingPutController implements Controller {
  constructor(readonly updateBooking: UpdateBooking) {}

  async run(req: Request, res: Response) {
    this.updateBooking.make({
      booking_id: req.body.booking_id,
      status: req.body.status
    });
    res.status(httpStatus.OK).send(this.toResponse());
  }

  private toResponse(): any {
    return {
      data: 'ok'
    };
  }
}
