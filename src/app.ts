import express from "express";
import { request } from "./Domain/request";
import { RequestRedisRepository } from "./Infrastructure/requestRedisRepository";

export const app = express();

app.get("/healthcheck", (req, res) => {
  res.send("ok");
});

app.get("/*", (req, res) => {
  const requestRepository = new RequestRedisRepository();
  requestRepository.get(req.url).then((request: request) => {
    res.status(request.response).send(request.message);
  });
});

app.post("/*", (req, res) => {
  const requestRepository = new RequestRedisRepository();
  requestRepository.get(req.url).then((request: request) => {
    res.status(request.response).send(request.message);
  });
});
