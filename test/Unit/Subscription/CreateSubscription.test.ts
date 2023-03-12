import {SubscriptionInMemoryRepository} from './../../Mock/Subscription/subscriptionInMemoryRepository';
import {CreateSubscription} from './../../../src/Application/Subscription/CreateSubscription';
import {makeNewRandomSubscription} from './../../Mock/Subscription/subscriptionMother';

describe('Create subscription', () => {
  it('Create subscription correctly', async () => {
    const randomSubscription = makeNewRandomSubscription();
    const subscriptionRepository = new SubscriptionInMemoryRepository();

    const subscriptionApplication = new CreateSubscription(subscriptionRepository);
    subscriptionApplication.make(randomSubscription.toPrimitives());
    const subscriptionResponse = await subscriptionRepository.get(
      randomSubscription.subscription_id
    );
    expect(subscriptionResponse).toEqual(randomSubscription);
  });
});
