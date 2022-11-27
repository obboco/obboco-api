import {Ulid} from '../../Domain/Shared/Ulid';
import {Guest} from '../../Domain/Guest';
import {GuestRepository} from '../../Application/Guest/GuestRepository';
import {execute} from './../Mysql/MysqlHandler';

export class GuestMysqlRepository implements GuestRepository {
  async add(guest: Guest): Promise<void> {
    await execute(
      'INSERT INTO guest(guest_id, partner_id, first_name, last_name, email, phone) VALUES(?, ?, ?, ?, ?, ?)',
      [
        guest.guest_id.value,
        guest.partner_id.value,
        guest.first_name,
        guest.last_name,
        guest.email,
        guest.phone,
      ]
    );
  }

  async update(guest: Guest): Promise<void> {
    await execute(
      'UPDATE guest SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE guest_id = ?',
      [guest.first_name, guest.last_name, guest.email, guest.phone, guest.guest_id.value]
    );
  }

  async get(guestId: Ulid): Promise<Guest> {
    const result = await execute(
      'SELECT guest_id, partner_id, first_name, last_name, email, phone FROM guest WHERE guest_id = ?',
      [guestId.value]
    );

    if (result[0] == undefined) {
      return null;
    }

    return Guest.fromPrimitives(JSON.parse(JSON.stringify(result[0])));
  }

  async getByPartner(partnerId: Ulid): Promise<Guest[]> {
    const result = await execute(
      'SELECT guest_id, partner_id, first_name, last_name, email, phone FROM guest WHERE partner_id = ?',
      [partnerId.value]
    );

    return Object.values(JSON.parse(JSON.stringify(result))).map((guest: any) =>
      Guest.fromPrimitives(guest)
    );
  }

  async delete(guestId: Ulid): Promise<void> {
    await execute('DELETE FROM guest WHERE guest_id = ? LIMIT 1', [guestId.value]);
  }
}
