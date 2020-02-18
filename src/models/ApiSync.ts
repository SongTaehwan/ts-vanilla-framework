import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {}
  // Deserialize (JSON.parse)
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`)
  }

  // Serialize (JSON.stringify)
  save(data: T): AxiosPromise {
    // not sure whether data always has the property named 'id'
    // to make sure that data has an id property, extends Generic type T with interface HasId which define property id with type of number
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}
