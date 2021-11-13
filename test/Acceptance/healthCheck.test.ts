import { app } from "../../src/app";
import request from "supertest";

describe("Health check", () => {
  it("Health check call", async (done) => {
    const response = await request(app).get("/healthcheck");

    expect(response.status).toBe(200);
    expect(response.text).toBe("ok");
    done();
  });
});
