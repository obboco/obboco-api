import { getPartnerByEmail } from './../../../Application/Partner/getPartnerByEmail';
import { Partner } from '../../../Domain/partner';
import { PartnerMysqlRepository } from './../../Repository/partnerMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class PartnerGetByEmailController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const getPartner: getPartnerByEmail = new getPartnerByEmail(
      new PartnerMysqlRepository()
    );

    try {
      const partner: Partner = await getPartner.make(req.params.email);
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
