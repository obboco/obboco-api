import { Booking } from '../../Domain/booking';
import { Uuid } from '../../Domain/Shared/uuid';
interface BookingPrimitives {
  booking_id: string;
  event_id: string;
  status: string;
  title: string;
  start_date: string;
  email: string;
  guest: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

export class BookingFactory {
  static fromPrimitives(primitives: BookingPrimitives): Booking {
    return Booking.create({
      booking_id: Uuid.fromPrimitives(primitives.booking_id),
      event_id: Uuid.fromPrimitives(primitives.event_id),
      status: primitives.status,
      title: primitives.title,
      start_date: new Date(primitives.start_date),
      email: primitives.email,
      guest: {
        first_name: primitives.guest.first_name,
        last_name: primitives.guest.last_name,
        email: primitives.guest.email,
        phone: primitives.guest.phone
      }
    });
  }
}
