import { PartnerMysqlRepository } from './../../Repository/partnerMysqlRepository';
import { Partner } from './../../../Domain/partner';
import { getPartnerBySubdomain } from './../../../Application/Partner/getPartnerBySubdomain';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class PartnerGetBySubdomainController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const getPartner: getPartnerBySubdomain = new getPartnerBySubdomain(
      new PartnerMysqlRepository()
    );

    try {
      const partner: Partner = await getPartner.make(req.params.subdomain);
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
