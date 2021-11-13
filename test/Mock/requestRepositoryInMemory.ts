import { RequestRepository } from "../../src/Application/requestRespository";
import { request } from "../../src/Domain/request";

export class RequestRepositoryInMemory implements RequestRepository {
  private values: Array<request> = [];

  get(path: string): Promise<request> {
    throw new Error("Method not implemented.");
  }

  put(request: request) {
    this.values.push(request);
  }

  total(): number {
    return this.values.length;
  }
}
