import { createClient } from 'redis';

export const redisConnection = async (): Promise<any> => {
  const client = createClient({
    url: process.env.REDIS_URL
  });

  client.on('error', (err) => {
    throw new Error('Redis cannot connect');
    return;
  });

  await client.connect();
  return client;
};
