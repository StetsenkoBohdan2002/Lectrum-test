import {
  ChangeCurrentBalace,
  ChangePersonData,
  Handler,
  Person,
} from './types';

enum EmitterMethods {
  RegisterPerson = 'register',
  ChangePersonBalance = 'changeBalance',
}

export class EventEmitter {
  events = Object.create(null);

  constructor() {
    this.on(EmitterMethods.RegisterPerson, (person: Person): void => {
      console.log(`Пользователь ${person.name} был успешно зарегистрирован`);
    }).on(
      EmitterMethods.ChangePersonBalance,
      ({ name, amount }: ChangePersonData): void => {
        console.log(`На счету ${name} — ${amount}$`);
      }
    );
  }
  on(type: string, handler: Handler<Person & ChangeCurrentBalace>): this {
    if (type in this.events) {
      this.events[type].push(handler);
    } else {
      this.events[type] = [handler];
    }

    return this;
  }

  emit(
    type: string,
    data: Person | ChangeCurrentBalace | ChangePersonData
  ): this {
    const handlers = this.events[type];

    if (Array.isArray(handlers)) {
      handlers.forEach((handler) => handler(data));
    }

    return this;
  }
}
