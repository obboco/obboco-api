import { GuestPass } from '../../Domain/GuestPass';
import { Ulid } from '../../Domain/Shared/Ulid';
import { GuestPassRepository } from './GuestPassRepository';

interface GuestPassUpdateCurrentCapacityCommand {
  guest_pass_id: string;
  action: string;
}

export class UpdateCurrentCapacityGuestPass {
  constructor(private guestPassRepository: GuestPassRepository) {}

  async make(command: GuestPassUpdateCurrentCapacityCommand): Promise<void> {
    if (!this.validateAction(command.action)) return;

    const guestPassId: Ulid = Ulid.fromPrimitives(command.guest_pass_id);
    const guestPass: GuestPass = await this.guestPassRepository.get(
      guestPassId
    );

    this.guestPassRepository.update(
      GuestPass.fromPrimitives({
        ...guestPass.toPrimitives(),
        current_quantity: this.calculateCurrentCapacity(
          command.action,
          guestPass.currentQuantity
        )
      })
    );
  }

  private validateAction(action: string): boolean {
    return action === 'increase' || action === 'decrease';
  }

  private calculateCurrentCapacity(
    action: string,
    currentCapacity: number
  ): number {
    if (action === 'increase') return ++currentCapacity;
    if (action === 'decrease') return --currentCapacity;
    return currentCapacity;
  }
}
