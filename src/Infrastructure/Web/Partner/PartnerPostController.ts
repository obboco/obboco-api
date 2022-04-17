import { PartnerMysqlRepository } from '../../partnerMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';
import { Ulid } from '../../../Domain/Shared/ulid';
import { CreatePartner } from '../../../Application/Partner/createPartner';

export class PartnerPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const createPartner: CreatePartner = new CreatePartner(
      new PartnerMysqlRepository()
    );

    try {
      const partner_id: Ulid = await createPartner.make(req);
      res.send({ partner_id: partner_id.value });
    } catch (e) {
      res.status(httpStatus.OK).json({ errors: [{ msg: e.message }] });
    }
  }
}
