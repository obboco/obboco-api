import {Controller} from '../Controller';
import {Request, Response} from 'express';
import httpStatus from 'http-status';
import {UpdateSubscription} from '../../../Application/Subscription/UpdateSubscription';
import {SubscriptionMysqlRepository} from '../../Repository/SubscriptionMysqlRepository';

export class SubscriptionPutController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const updateSubscription: UpdateSubscription = new UpdateSubscription(
      new SubscriptionMysqlRepository()
    );
    updateSubscription.make({
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
