import { app } from "../../../src/app";
import request from "supertest";
import assert from "assert";

describe("Create partner", () => {
  it("Create partner correctly", (done) => {
    request(app)
      .post("/partner")
      .send({
        name: "test"
      })
      .expect(200)
      .then((response) => {
        assert.ok(typeof response.body.partner_id === "string");
        done();
      });
  });
});
