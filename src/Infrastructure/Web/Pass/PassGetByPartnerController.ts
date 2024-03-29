import { GetPassByPartner } from '../../../Application/Pass/GetPassByPartner';
import { Pass } from '../../../Domain/Pass';
import { PassMysqlRepository } from '../../Repository/PassMysqlRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class PassGetByPartnerController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
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
