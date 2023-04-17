import {Controller} from '../Controller';
import {Request, Response} from 'express';
import httpStatus from 'http-status';
import {ListSubscription} from '../../../Application/Subscription/ListSubscription';
import {SubscriptionMysqlRepository} from '../../Repository/SubscriptionMysqlRepository';
import {Subscription} from '../../../Domain/Subscription';

export class SubscriptionListController implements Controller {
  constructor() {}

  async run(req: Request, res: Response) {
    const listSubscription: ListSubscription = new ListSubscription(
      new SubscriptionMysqlRepository()
    );
    const subscriptions: Subscription[] = await listSubscription.make({
      partner_id: req.params.partner_id,
    });
    res.status(httpStatus.OK).send(this.toResponse(subscriptions));
  }

  private toResponse(subscriptions: Subscription[]): any {
    return {
      data: subscriptions.map((subscription: Subscription) => {
        return subscription.toPrimitives();
      }),
    };
  }
}
