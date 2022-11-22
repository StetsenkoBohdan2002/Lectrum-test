export interface Person {
  name: string;
  balance: number;
}
export interface Persons{
   [key:number]:Person
}
export interface ChangeCurrentBalace {
  personId: number;
  amount: number;
}
export interface ChangePersonData {
  name: string;
  amount: number;
}


export type Handler<Person> = (data: Person) => void;
