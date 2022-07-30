import { GuestPassMysqlRepository } from './../../Repository/guestPassMysqlRepository';
import { CreateGuestPass } from './../../../Application/GuestPass/createGuestPass';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { PassMysqlRepository } from '../../Repository/passMysqlRepository';

export class GuestPassPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const createGuestPass: CreateGuestPass = new CreateGuestPass(
      new GuestPassMysqlRepository(),
      new PassMysqlRepository()
    );
    createGuestPass.make({
      guest_pass_id: req.body.guest_pass_id,
      pass_id: req.body.pass_id,
      guest_id: req.body.guest_id,
      partner_id: req.body.partner_id
    });
    res.status(httpStatus.OK).send(this.toResponse());
  }

  private toResponse(): any {
    return {
      data: 'ok'
    };
  }
}
