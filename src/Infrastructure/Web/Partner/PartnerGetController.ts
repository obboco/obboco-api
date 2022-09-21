import { PartnerMysqlRepository } from '../../Repository/PartnerMysqlRepository';
import { Partner } from '../../../Domain/Partner';
import { GetPartner } from '../../../Application/Partner/GetPartner';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { Ulid } from '../../../Domain/Shared/Ulid';

export class PartnerGetController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const partnerId: string = req.params.partner_id;
    const getPartner: GetPartner = new GetPartner(new PartnerMysqlRepository());

    try {
      const partner: Partner = await getPartner.make(
        Ulid.fromPrimitives(partnerId)
      );
      res.status(httpStatus.OK).send(this.toResponse(partner));
    } catch (e) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: [{ msg: e.message }] });
    }
  }

  private toResponse(partner: Partner): any {
    return {
      data: partner.toPrimitives()
    };
  }
}
