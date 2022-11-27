import {GuestPassMysqlRepository} from './../../Repository/GuestPassMysqlRepository';
import {UpdateCurrentCapacityGuestPass} from './../../../Application/GuestPass/UpdateCurrentCapacityGuestPass';
import {EventMysqlRepository} from './../../Repository/EventMysqlRepository';
import {BookingMysqlRepository} from './../../Repository/BookingMysqlRepository';
import {UpdateBooking} from '../../../Application/Booking/UpdateBooking';
import {Request, Response} from 'express';
import httpStatus from 'http-status';
import {Controller} from '../Controller';
import {UpdateCurrentCapacityEvent} from '../../../Application/Event/UpdateCurrentCapacityEvent';

export class BookingPutController implements Controller {
  constructor() {}
  async run(req: Request, res: Response) {
    const updateBooking: UpdateBooking = new UpdateBooking(
      new BookingMysqlRepository(),
      new UpdateCurrentCapacityEvent(new EventMysqlRepository()),
      new UpdateCurrentCapacityGuestPass(new GuestPassMysqlRepository())
    );
    updateBooking.make({
      booking_id: req.body.booking_id,
      status: req.body.status,
    });
    res.status(httpStatus.OK).send(this.toResponse());
  }

  private toResponse(): any {
    return {
      data: 'ok',
    };
  }
}
