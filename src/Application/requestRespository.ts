import { request } from "./../Domain/request";

export interface RequestRepository {
  put(request: request): void;
  get(path: string): Promise<request>;
  total(): number;
}
