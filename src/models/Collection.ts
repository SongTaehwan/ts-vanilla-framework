import axios, { AxiosResponse, AxiosError } from 'axios';
import { Eventing } from './Eventing';

export class Collection<T, K> {
  // models: User[] = [];
  models: T[] = [];
  events: Eventing = new Eventing();

  // constructor(public rootUrl: string) {}
  constructor(
    public rootUrl: string,
    public deserialize: (json: K) => T
  ) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl)
      .then((res: AxiosResponse): void => {
        // res.data.forEach((value: UserProps) => { // before
        res.data.forEach((value: K) => { // after refactor
          // const user = User.buildUser(value);
          this.models.push(this.deserialize(value));
        });

        this.trigger('change');
      })
      .catch((err: AxiosError): void => {
        console.log(err)
      });
  }
}
