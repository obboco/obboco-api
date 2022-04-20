import { PartnerMysqlRepository } from './../../Repository/partnerMysqlRepository';
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
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }

    const createPartner: CreatePartner = new CreatePartner(
      new PartnerMysqlRepository()
    );

    try {
      const partner_id: Ulid = await createPartner.make({
        partner_id: req.body.partner_id,
        email: req.body.email,
        given_name: req.body.given_name,
        family_name: req.body.family_name,
        picture: req.body.picture,
        locale: req.body.locale,
        subscription_plan: req.body.subscription_plan,
        subdomain: req.body.subdomain
      });
      res.send(this.toResponse(partner_id));
    } catch (e) {
      res.status(httpStatus.OK).json({ errors: [{ msg: e.message }] });
    }
  }

  private toResponse(partnerId: Ulid): any {
    return {
      partner_id: partnerId.value
    };
  }
}
