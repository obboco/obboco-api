import {Controller} from '../Controller';
import {Request, Response} from 'express';
import httpStatus from 'http-status';
import {ListSubscriptionGuest} from '../../../Application/SubscriptionGuest/ListSubscriptionGuest';
import {SubscriptionGuestMysqlRepository} from '../../Repository/SubscriptionGuestMysqlRepository';
import {SubscriptionGuest} from '../../../Domain/SubscriptionGuest';

export class SubscriptionGuestListController implements Controller {
  constructor() {}  

  async run(req: Request, res: Response) {
    const listSubscriptionGuest: ListSubscriptionGuest = new ListSubscriptionGuest(
      new SubscriptionGuestMysqlRepository()
    );
    const subscriptionGuests: SubscriptionGuest[] = await listSubscriptionGuest.make({
      subscription_id: req.body.subscription_id,
    });
    res.status(httpStatus.OK).send(this.toResponse(subscriptionGuests));
  }

  private toResponse(subscriptionGuests: SubscriptionGuest[]): any {
    return {
      data: subscriptionGuests.map((subscriptionGuest: SubscriptionGuest) => {
        return subscriptionGuest.toPrimitives();
      }),
    };
  }
}
