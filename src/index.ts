// Для запуска файла использовать команду ts-node src/index.ts находясь в папке homeworks/2
import { EventEmitter } from './emitter';
import { ChangeCurrentBalace, Person, Persons } from './types';

class Bank extends EventEmitter {
  private persons: Persons = {};

  constructor() {
    super();
    this.on('add', (data: ChangeCurrentBalace) => this.add(data));
    this.on('withdraw', (data: ChangeCurrentBalace) => this.withdraw(data));
  }

  register(person: Person): number {
    const id = Date.now();

    this.persons[id] = { ...person };
    this.emit('register', person);
    return id;
  }

  private add(data: ChangeCurrentBalace): void {
    const { personId, amount } = data;
    const person = this.persons[personId];

    if (!person) {
      throw new Error(`Пользователь с идентификатором ${personId} не найден`);
    }

    person.balance = person.balance + amount;

    this.emit('changeBalance', { name: person.name, amount: person.balance });
  }
  private withdraw(data: ChangeCurrentBalace): void {
    const { personId, amount } = data;
    const person = this.persons[personId];

    if (!person) {
      throw new Error(`Пользователь с идентификатором ${personId} не найден`);
    }

    person.balance = person.balance - amount;
    if (person.balance < 0) {
      person.balance = 0;
    }

    this.emit('changeBalance', { name: person.name, amount: person.balance });
  }
}

const bank = new Bank();

const personId = bank.register({
  name: 'Джон Доу',
  balance: 100,
});
bank.emit('add', { personId, amount: 20 });

// Задание со звёздочкой
bank.emit('withdraw', { personId, amount: 400 });
