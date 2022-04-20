import { Guest } from './../../Domain/guest';
import { GuestRepository } from './../../Application/Guest/guestRepository';
import { mysqlConnection } from './../Mysql/mysqlConnector';

export class GuestMysqlRepository implements GuestRepository {
  async add(guest: Guest): Promise<void> {
    const connection = await mysqlConnection();
    connection.execute(
      'INSERT INTO guest(guest_id, first_name, last_name, email, phone) VALUES(?, ?, ?, ?, ?)',
      [
        guest.guest_id.value,
        guest.first_name,
        guest.last_name,
        guest.email,
        guest.phone
      ]
    );
  }
}
