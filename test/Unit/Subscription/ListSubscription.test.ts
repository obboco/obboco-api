import {makeNewRandomSubscription} from './../../Mock/Subscription/subscriptionMother';
import {Ulid} from './../../../src/Domain/Shared/Ulid';
import {ListSubscription} from './../../../src/Application/Subscription/ListSubscription';
import {Subscription} from './../../../src/Domain/Subscription';
import {SubscriptionInMemoryRepository} from './../../Mock/Subscription/subscriptionInMemoryRepository';

describe('List subscriptions', () => {
  it('List empty subscriptions correctly', async () => {
    const subscriptionRepository = new SubscriptionInMemoryRepository();
    const listSubscription = new ListSubscription(subscriptionRepository);
    const subscriptions: Subscription[] = await listSubscription.make({
      partner_id: Ulid.create().value,
    });
    expect(subscriptions).toHaveLength(0);
  });

  it('List 1 subscription correctly', async () => {
    const randomSubscription = makeNewRandomSubscription();
    const subscriptionRepository = new SubscriptionInMemoryRepository();
    await subscriptionRepository.add(randomSubscription);

    const listSubscription = new ListSubscription(subscriptionRepository);
    const subscriptions: Subscription[] = await listSubscription.make({
      partner_id: randomSubscription.partner_id.value,
    });

    expect(subscriptions).toHaveLength(1);
    expect(subscriptions[0]).toEqual(randomSubscription);
  });

  it('List multple subscription correctly', async () => {
    const randomSubscription = makeNewRandomSubscription();
    const subscriptionRepository = new SubscriptionInMemoryRepository();
    await subscriptionRepository.add(randomSubscription);
    await subscriptionRepository.add(
      Subscription.fromPrimitives({
        ...randomSubscription.toPrimitives(),
        subscription_id: Ulid.create().value,
      })
    );
    await subscriptionRepository.add(
      Subscription.fromPrimitives({
        ...randomSubscription.toPrimitives(),
        subscription_id: Ulid.create().value,
      })
    );

    const listSubscription = new ListSubscription(subscriptionRepository);
    const subscriptions: Subscription[] = await listSubscription.make({
      partner_id: randomSubscription.partner_id.value,
    });

    expect(subscriptions).toHaveLength(3);
  });
});
