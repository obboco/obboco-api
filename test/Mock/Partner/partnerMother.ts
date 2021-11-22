import { Uuid } from "../../../src/Domain/Shared/uuid";
import { Partner } from "./../../../src/Domain/partner";

export const makeRandomPartner = (): Partner => {
  return Partner.create({
    partner_id: Uuid.create(),
    email: "string"
  });
};
