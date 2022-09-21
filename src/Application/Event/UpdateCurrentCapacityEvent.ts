import { Event } from '../../Domain/Event';
import { Ulid } from '../../Domain/Shared/Ulid';
import { EventRepository } from './EventRepository';

interface EventUpdateCurrentCapacityCommand {
  action: string;
  event_id: string;
  current_capacity: number;
}

export class UpdateCurrentCapacityEvent {
  constructor(private eventRepository: EventRepository) {}

  async make(command: EventUpdateCurrentCapacityCommand): Promise<void> {
    const eventId = Ulid.fromPrimitives(command.event_id);
    const event: Event = await this.eventRepository.get(eventId);

    if (!this.validateAction(command.action)) return;

    const currentCapacity: number = this.calculateCurrentCapacity(
      command.action,
      event.current_capacity
    );

    const updateEvent: Event = Event.fromPrimitives({
      event_id: event.event_id.value,
      start_date: event.start_date.toISOString(),
      duration: event.duration,
      current_capacity: currentCapacity,
      capacity: event.capacity,
      activity_id: event.activity_id.value
    });
    await this.eventRepository.update(updateEvent);
  }

  validateAction(action: string): boolean {
    return action === 'increase' || action === 'decrease';
  }

  calculateCurrentCapacity(action: string, currentCapacity): number {
    if (action === 'increase') return ++currentCapacity;
    if (action === 'descrease') return --currentCapacity;
    return currentCapacity;
  }
}
