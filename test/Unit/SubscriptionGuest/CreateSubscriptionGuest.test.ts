import {SubscriptionGuestInMemoryRepository} from './../../Mock/SubscriptionGuest/subscriptionGuestInMemoryRepository';
import {CreateSubscriptionGuest} from './../../../src/Application/SubscriptionGuest/CreateSubscriptionGuest';
import {makeNewRandomSubscriptionGuest} from './../../Mock/SubscriptionGuest/subscriptionGuestMother';

describe('Create subscription guest', () => {
  it('Create subscription guest correctly', async () => {
    const randomSubscriptionGuest = makeNewRandomSubscriptionGuest();
    const subscriptionGuestRepository = new SubscriptionGuestInMemoryRepository();

    const createSubscriptionGuest = new CreateSubscriptionGuest(
      subscriptionGuestRepository
    );
    createSubscriptionGuest.make(randomSubscriptionGuest.toPrimitives());
    const subscriptionGuestResponse = await subscriptionGuestRepository.get(
      randomSubscriptionGuest.subscription_guest_id
    );
    expect(subscriptionGuestResponse).toEqual(randomSubscriptionGuest);
  });
});
