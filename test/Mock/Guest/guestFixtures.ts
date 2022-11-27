import {Guest} from '../../../src/Domain/Guest';
import {execute} from '../../../src/Infrastructure/Mysql/MysqlHandler';

export class GuestFixtures {
  async getGuest(guestId: string): Promise<Guest | null> {
    const result: any = await execute(
      'SELECT guest_id, partner_id, first_name, last_name, email, phone FROM guest WHERE guest_id = ?',
      [guestId]
    );

    if (result[0] == undefined) {
      return null;
    }

    return Guest.fromPrimitives(result[0]);
  }

  async getByEmail(email: string): Promise<Guest | null> {
    const result: any = await execute(
      'SELECT guest_id, partner_id, first_name, last_name, email, phone FROM guest WHERE email = ?',
      [email]
    );

    if (result[0] == undefined) {
      return null;
    }

    return Guest.fromPrimitives(result[0]);
  }

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
}
