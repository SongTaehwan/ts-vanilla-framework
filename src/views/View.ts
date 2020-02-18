// interface ModelForView {
//   on(eventName: string, callback: () => void): void;
//   // model 모든 메소드를 다 적어야함 not good
// }

import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element} = {};

  regionsMap(): { [key: string]: string } {
    return {};
  }

  abstract template(): string;
  // default func, meaning this method not required to subclass
  // can be override by subclass
  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  bindModel(): void {
    // this.model이 실제 on 메소드를 가지고 있어도 View 에서는 알 수 없음
    // this.model은 유연하게 바뀌기 때문!
    // Generic constraint 를 이용해 this.model이 항상 on 매소드를 가지고 있음을 표시
    this.model.on('change', () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach((element: Element): void => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      // key userForm, userShow...
      // selector .user-form, .user-show
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);

      if (element) {
        // regions: { userShow: Element }
        this.regions[key] = element;
      }
    }
  }

  // default 
  onRender(): void {}

  render(): void {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }
}
