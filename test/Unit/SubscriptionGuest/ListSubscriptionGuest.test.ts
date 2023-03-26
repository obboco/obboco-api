import {makeNewRandomSubscriptionGuest} from './../../Mock/SubscriptionGuest/subscriptionGuestMother';
import {SubscriptionGuest} from './../../../src/Domain/SubscriptionGuest';
import {ListGuestSubscription} from '../../../src/Application/SubscriptionGuest/ListSubscriptionGuest';
import {SubscriptionGuestInMemoryRepository} from './../../Mock/SubscriptionGuest/subscriptionGuestInMemoryRepository';
import {Ulid} from './../../../src/Domain/Shared/Ulid';

describe('List guest subscriptions', () => {
  it('List empty guest subscriptions correctly', async () => {
    const subscriptionGuestRepository = new SubscriptionGuestInMemoryRepository();
    const listSubscriptionGuest = new ListGuestSubscription(subscriptionGuestRepository);
    const subscriptions: SubscriptionGuest[] = await listSubscriptionGuest.make({
      subscription_id: Ulid.create().value,
    });
    expect(subscriptions).toHaveLength(0);
  });

  it('List 1 guest subscription correctly', async () => {
    const randomSubscriptionGuest = makeNewRandomSubscriptionGuest();
    const subscriptionGuestRepository = new SubscriptionGuestInMemoryRepository();
    await subscriptionGuestRepository.add(randomSubscriptionGuest);

    const listSubscriptionGuest = new ListGuestSubscription(subscriptionGuestRepository);
    const subscriptions: SubscriptionGuest[] = await listSubscriptionGuest.make({
      subscription_id: randomSubscriptionGuest.subscription_id.value,
    });

    expect(subscriptions).toHaveLength(1);
    expect(subscriptions[0]).toEqual(randomSubscriptionGuest);
  });

  it('List mutliple subscriptions correctly', async () => {
    const randomSubscriptionGuest = makeNewRandomSubscriptionGuest();
    const subscriptionGuestRepository = new SubscriptionGuestInMemoryRepository();
    await subscriptionGuestRepository.add(randomSubscriptionGuest);
    await subscriptionGuestRepository.add(
      SubscriptionGuest.fromPrimitives({
        ...randomSubscriptionGuest.toPrimitives(),
        subscription_guest_id: Ulid.create().value,
      })
    );
    await subscriptionGuestRepository.add(
      SubscriptionGuest.fromPrimitives({
        ...randomSubscriptionGuest.toPrimitives(),
        subscription_guest_id: Ulid.create().value,
      })
    );

    const listSubscriptionGuest = new ListGuestSubscription(subscriptionGuestRepository);
    const subscriptions: SubscriptionGuest[] = await listSubscriptionGuest.make({
      subscription_id: randomSubscriptionGuest.subscription_id.value,
    });

    expect(subscriptions).toHaveLength(3);
  });
});
