import { View } from "./View";
import { User, UserProps } from '../models/User';

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick
    };
  }

  onSaveClick = (): void => {
    this.model.save();
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');

    // querySelector might return null if not found any matches
    // to turn off TS error below,  use type guard!

    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  }

  template(): string {
    return `
      <div>
        <input placeholder="${this.model.get('name')}" />
        <button class="set-name">Change Name</button>
        <button class="set-age">Set Random age</button>
        <button class="save-model">Save User</button>
      </div>
    `;
  }
}
