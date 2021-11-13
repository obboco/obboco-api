import { RequestRepository } from "../Application/requestRespository";
import Redis from "ioredis";
import { request } from "../Domain/request";

export class RequestRedisRepository implements RequestRepository {
  protected redis;

  constructor() {
    this.redis = new Redis();
  }
  async get(path: string): Promise<request> {
    return this.redis.get(path).then((value: string) => {
      return JSON.parse(value) as request;
    });
  }

  put(request: request): void {
    this.redis.set(request.path, JSON.stringify(request));
  }
  total(): number {
    return this.redis.count();
  }
}
