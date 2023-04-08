import {CreateSubscription} from '../../../Application/Subscription/CreateSubscription';
import {SubscriptionMysqlRepository} from '../../Repository/SubscriptionMysqlRepository';
import {Controller} from '../Controller';
import {Request, Response} from 'express';
import httpStatus from 'http-status';

export class SubscriptionPostController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const createSubscription: CreateSubscription = new CreateSubscription(
      new SubscriptionMysqlRepository()
    );
    createSubscription.make({
      subscription_id: req.body.subscription_id,
      partner_id: req.body.partner_id,
      name: req.body.name,
      price: req.body.price,
      currency: req.body.currency,
      cycle: req.body.cycle,
    });
    res.status(httpStatus.OK).send(this.toResponse());
  }

  private toResponse(): any {
    return {
      data: 'ok',
    };
  }
}
