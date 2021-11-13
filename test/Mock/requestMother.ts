import { request } from "../../src/Domain/request";

export const makeGetRequestWith200 = (): request => {
  return {
    path: "/test",
    method: "GET",
    response: 200,
    message: "It works!",
  } as request;
};

export const makePostRequestWith200 = (): request => {
  return {
    path: "/test",
    method: "POST",
    response: 200,
    message: "It works!",
  } as request;
};
