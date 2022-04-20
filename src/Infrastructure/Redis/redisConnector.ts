import { createClient } from 'redis';

export const redisConnection = async (): Promise<any> => {
  const client = createClient({
    url: process.env.REDIS_URL
  });
  client.connect();
  return client;
};
