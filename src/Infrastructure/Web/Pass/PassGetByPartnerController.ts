import { GetPassByPartner } from './../../../Application/Pass/getPassByPartner';
import { Pass } from '../../../Domain/pass';
import { PassMysqlRepository } from '../../Repository/passMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class PassGetByPartnerController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }
    const getPassByPartner: GetPassByPartner = new GetPassByPartner(
      new PassMysqlRepository()
    );
    const multiplePass: Pass[] = await getPassByPartner.make({
      partner_id: req.params.partner_id
    });
    res.status(httpStatus.OK).send(this.toResponse(multiplePass));
  }

  private toResponse(multiplePass: Pass[]): any {
    return {
      data: multiplePass.map((pass: Pass) => {
        return pass.toPrimitives();
      })
    };
  }
}
