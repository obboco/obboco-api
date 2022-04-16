import { getPartnerBySubdomain } from './../../../Application/Partner/getPartnerBySubdomain';
import { Partner } from '../../../Domain/partner';
import { PartnerMysqlRepository } from '../../partnerMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class PartnerGetBySubdomainController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }

    const getPartner: getPartnerBySubdomain = new getPartnerBySubdomain(
      new PartnerMysqlRepository()
    );

    try {
      const partner: Partner = await getPartner.make(req.params.subdomain);
      res.status(httpStatus.OK).send({ data: partner });
    } catch (e) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: [{ msg: e.message }] });
    }
  }
}
