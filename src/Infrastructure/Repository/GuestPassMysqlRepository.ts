import { GuestPassRepository } from '../../Application/GuestPass/GuestPassRepository';
import { Ulid } from '../../Domain/Shared/Ulid';
import { GuestPass } from '../../Domain/GuestPass';
import { Criteria } from '../../Domain/Criteria/Criteria';
import { Filter } from '../../Domain/Criteria/Filter';
import {execute} from './../Mysql/MysqlHandler';

export class GuestPassMysqlRepository implements GuestPassRepository {
  async add(guestPass: GuestPass): Promise<void> {
    await execute(
      'INSERT INTO guest_pass(guest_pass_id, pass_id, guest_id, partner_id, title, quantity, current_quantity, price, currency, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        guestPass.guestPassId.value,
        guestPass.passId.value,
        guestPass.guestId.value,
        guestPass.partnerId.value,
        guestPass.title,
        guestPass.quantity,
        guestPass.currentQuantity,
        guestPass.price,
        guestPass.currency,
        guestPass.status
      ]
    );
  }

  async get(guestPassId: Ulid): Promise<GuestPass> {
    const result = await execute(
      'SELECT guest_pass_id, pass_id, guest_id, partner_id, title, quantity, current_quantity, price, currency, status FROM guest_pass WHERE guest_pass_id = ?',
      [guestPassId.value]
    );

    return result[0] == undefined ? null : GuestPass.fromPrimitives(result[0]);
  }

  async getByCriteria(criteria: Criteria): Promise<GuestPass[]> {
    const filters: string = criteria.filters
      .map((filter: Filter): string => {
        return `${filter.field} ${filter.operator} '${filter.value}'`;
      })
      .join(' AND ');

    const result = await execute(
      `SELECT guest_pass_id, pass_id, guest_id, partner_id, title, quantity, current_quantity, price, currency, status, created_at as created_date FROM guest_pass WHERE ${filters} ORDER BY created_at DESC`
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map(
      (guestPass: any) => GuestPass.fromPrimitives(guestPass)
    );
  }

  async getByGuest(guestId: Ulid): Promise<GuestPass[]> {
    const result = await execute(
      'SELECT guest_pass_id, pass_id, guest_id, partner_id, title, quantity, current_quantity, price, currency, status FROM guest_pass WHERE guest_id = ?',
      [guestId.value]
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map(
      (guestPass: any) => GuestPass.fromPrimitives(guestPass)
    );
  }

  async getByPass(passId: Ulid): Promise<GuestPass[]> {
    const result = await execute(
      'SELECT guest_pass_id, pass_id, guest_id, partner_id, title, quantity, current_quantity, price, currency, status FROM guest_pass WHERE pass_id = ?',
      [passId.value]
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map(
      (guestPass: any) => GuestPass.fromPrimitives(guestPass)
    );
  }

  async update(guestPass: GuestPass): Promise<void> {
    await execute(
      'UPDATE guest_pass SET title = ?, quantity = ?, current_quantity = ?, price = ?, currency = ?, status = ? WHERE guest_pass_id = ? LIMIT 1',
      [
        guestPass.title,
        guestPass.quantity,
        guestPass.currentQuantity,
        guestPass.price,
        guestPass.currency,
        guestPass.status,
        guestPass.guestPassId.value
      ]
    );
  }

  async delete(guestPassId: Ulid): Promise<void> {
    await execute(
      'DELETE FROM guest_pass WHERE guest_pass_id = ? LIMIT 1',
      [guestPassId.value]
    );
  }
}
