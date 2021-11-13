import { RequestRepository } from "./requestRespository";

export class RequestExecutor {
  protected requestRepository: RequestRepository;

  constructor(requestRepository: RequestRepository) {
    this.requestRepository = requestRepository;
  }

  execute(): void {
  }
}
