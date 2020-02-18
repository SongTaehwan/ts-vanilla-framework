
type Callback = () => void

export class Eventing {
  events: { [key: string]: Callback[] } = {};

  // 화살표 함수가 필요하지않으나 User 클래스 안의 events 프로퍼티의 이름값이 바뀌면 에러 발생
  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach(callback => callback());
  }
}
