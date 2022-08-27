import { GuestPassMysqlRepository } from './../../Repository/guestPassMysqlRepository';
import { GuestPass } from './../../../Domain/guestPass';
import { GetGuestPassWithFilter } from './../../../Application/GuestPass/getGuestPassWithFilter';
import { Filter } from '../../../Domain/Criteria/filter';
import { Criteria } from '../../../Domain/Criteria/criteria';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class GuestPassListWithFiltersController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const getGuestPassWithFilter: GetGuestPassWithFilter =
      new GetGuestPassWithFilter(new GuestPassMysqlRepository());
    const guestPasses: GuestPass[] = await getGuestPassWithFilter.make({
      criteria: this.makeCriteria(req)
    });
    res.status(httpStatus.OK).send(this.toResponse(guestPasses));
  }

  private makeCriteria(req: Request): Criteria {
    let filters: Filter[] = [];

    if (req.query.partner) {
      filters.push(new Filter('partner_id', '=', req.query.partner as string));
    }

    if (req.query.start_date && req.query.end_date) {
      filters.push(
        new Filter('created_at', '>=', req.query.start_date as string)
      );
      filters.push(
        new Filter('created_at', '<=', req.query.end_date as string)
      );
    }

    if (req.query.status) {
      filters.push(new Filter('status', '=', req.query.status as string));
    }

    return new Criteria(filters);
  }

  private toResponse(guestPasses: GuestPass[]): any {
    return {
      data: guestPasses.map((guestPass) => guestPass.toPrimitives())
    };
  }
}
