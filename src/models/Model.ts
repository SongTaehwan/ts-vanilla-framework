import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(value: T): void;
  getAll(): T;
}

interface Sync<T> {
  save(data: T): AxiosPromise;
  fetch(id: number): AxiosPromise;
}

interface HasId {
  id?: number
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

export abstract class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private sync: Sync<T>,
    private events: Events
  ) {}

  // shortcut lec no.179
  get = this.attributes.get;
  on = this.events.on;
  trigger = this.events.trigger;

  // get get() {
  //   return this.attributes.get;
  // }

  // get on()  {
  //   return this.events.on;
  // }

  // get trigger() {
  //   return this.events.trigger;
  // }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.attributes.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id');
    }

    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data);
    }).catch(() => {
      this.trigger('error');
    });
  }

  save(): void {
    this.sync.save(this.attributes.getAll())
      .then((res: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
