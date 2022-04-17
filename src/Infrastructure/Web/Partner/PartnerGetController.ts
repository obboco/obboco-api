import { Partner } from '../../../Domain/partner';
import { PartnerMysqlRepository } from '../../partnerMysqlRepository';
import { GetPartner } from '../../../Application/Partner/getPartner';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';
import { Ulid } from '../../../Domain/Shared/ulid';

export class PartnerGetController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const id: string = req.params.id;
    const getPartner: GetPartner = new GetPartner(new PartnerMysqlRepository());

    try {
      const partner: Partner = await getPartner.make(Ulid.fromPrimitives(id));
      res.status(httpStatus.OK).send({ data: partner });
    } catch (e) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: [{ msg: e.message }] });
    }
  }
}
