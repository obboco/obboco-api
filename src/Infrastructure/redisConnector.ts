import { createClient } from 'redis';

export const redisConnection = async (): Promise<any> => {
  const client = createClient({
    url: 'redis://localhost:6379'
  });
  client.connect();
  return client;
};
