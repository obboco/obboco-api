import {Subscription} from './../../../src/Domain/Subscription';
import {SubscriptionInMemoryRepository} from '../../Mock/Subscription/subscriptionInMemoryRepository';
import {makeNewRandomSubscription} from '../../Mock/Subscription/subscriptionMother';
import {UpdateSubscription} from '../../../src/Application/Subscription/UpdateSubscription';

describe('Update subscription', () => {
  it('Update subscription correctly', async () => {
    const randomSubscription: Subscription = makeNewRandomSubscription();
    const subscriptionRepository = new SubscriptionInMemoryRepository();
    subscriptionRepository.add(randomSubscription);

    const updateSubscription = new UpdateSubscription(subscriptionRepository);
    let subscription = randomSubscription.toPrimitives();
    subscription.subscription_id = randomSubscription.subscription_id.value;

    updateSubscription.make(subscription);
    const subscriptionResponse = await subscriptionRepository.get(
      randomSubscription.subscription_id
    );
    expect(subscriptionResponse.toPrimitives()).toEqual(subscription);
  });
});
