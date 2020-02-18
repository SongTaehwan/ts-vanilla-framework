// import { UserProps } from "./User";

export class Attributes<T> {
  constructor(private data: T) {}

  // K shorts for KeyOfObject
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  }

  set(update: T): void {
    const copy = Object.assign(this.data, update);
    // console.log(copy === this.data) // true
  }

  getAll(): T {
    return this.data;
  }
}

// const attrs = new Attributes<UserProps>({
//   name: 'asfasdf',
//   age: 0,
//   id: 5
// });
// const id = attrs.get('id')
