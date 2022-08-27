import { Filter } from './../../../Domain/Criteria/filter';
import { Criteria } from './../../../Domain/Criteria/criteria';
import { GetBookingsWithFilter } from './../../../Application/Booking/getBookingsWithFilter';
import { Booking } from '../../../Domain/booking';
import { BookingMysqlRepository } from '../../Repository/bookingMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class BookingListWithFiltersController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const getBookingsWithFilter: GetBookingsWithFilter =
      new GetBookingsWithFilter(new BookingMysqlRepository());
    const bookings: Booking[] = await getBookingsWithFilter.make({
      criteria: this.makeCriteria(req)
    });
    res.status(httpStatus.OK).send(this.toResponse(bookings));
  }

  private makeCriteria(req: Request): Criteria {
    let filters: Filter[] = [];

    if (req.query.partner) {
      filters.push(new Filter('partner_id', '=', req.query.partner as string));
    }

    if (req.query.start_date && req.query.end_date) {
      filters.push(
        new Filter('start_date', '>=', req.query.start_date as string)
      );
      filters.push(
        new Filter('start_date', '<=', req.query.end_date as string)
      );
    }

    if (req.query.status) {
      filters.push(new Filter('status', '=', req.query.status as string));
    }

    return new Criteria(filters);
  }

  private toResponse(bookings: Booking[]): any {
    return {
      data: bookings.map((booking) => booking.toPrimitives())
    };
  }
}
