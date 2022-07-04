import { PassMysqlRepository } from './../../Repository/passMysqlRepository';
import { CreatePass } from './../../../Application/Pass/createPass';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { validationResult } from 'express-validator';

export class PassPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
      return;
    }
    const createPass: CreatePass = new CreatePass(new PassMysqlRepository());
    createPass.make({
      pass_id: req.body.pass_id,
      partner_id: req.body.partner_id,
      title: req.body.title,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
      currency: req.body.currency
    });
    res.status(httpStatus.OK).send(this.toResponse());
  }

  private toResponse(): any {
    return {
      data: 'ok'
    };
  }
}
