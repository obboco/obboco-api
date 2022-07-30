import { Filter } from './filter';
export class Criteria {
  constructor(
    readonly filters: Filter[],
    readonly order?: string,
    readonly offset?: number,
    readonly limit?: number
  ) {}
}
