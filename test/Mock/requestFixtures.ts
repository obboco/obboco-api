import { request } from "../../src/Domain/request";
import { RequestRedisRepository } from "../../src/Infrastructure/requestRedisRepository";
import { makeGetRequestWith200, makePostRequestWith200 } from "./requestMother";

export const getOkRequestFixtures = (): request => {
  const requestRedisRepository = new RequestRedisRepository();
  const request = makeGetRequestWith200();
  requestRedisRepository.put(request);
  return request;
};

export const postOkRequestFixtures = (): request => {
  const requestRedisRepository = new RequestRedisRepository();
  const request = makePostRequestWith200();
  requestRedisRepository.put(request);
  return request;
};
