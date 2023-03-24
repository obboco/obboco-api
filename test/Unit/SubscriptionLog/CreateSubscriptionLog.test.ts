import {CreateSubscriptionLog} from './../../../src/Application/SubscriptionLog/CreateSubscriptionLog';
import {SubscriptionLogInMemoryRepository} from './../../Mock/SubscriptionLog/subscriptionLogInMemoryRepository';
import {makeNewRandomSubscriptionLog} from '../../Mock/SubscriptionLog/subscriptionLogMother';

describe('Create subscription log', () => {
  it('Create subscription log correctly', async () => {
    const randomSubscriptionLog = makeNewRandomSubscriptionLog();
    const subscriptionLogRepository = new SubscriptionLogInMemoryRepository();

    const createSubscriptionLog = new CreateSubscriptionLog(subscriptionLogRepository);
    createSubscriptionLog.make(randomSubscriptionLog.toPrimitives());
    const subscriptionLogResponse = await subscriptionLogRepository.get(
      randomSubscriptionLog.subscription_log_id
    );
    expect(subscriptionLogResponse).toEqual(randomSubscriptionLog);
  });
});
