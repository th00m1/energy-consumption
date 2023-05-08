import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

export enum ConsumptionMode {
  LOW = 'LOW',
  PERFORMANCE = 'PERFORMANCE',
  SMART = 'SMART',
  CUSTOM = 'CUSTOM'
}

export type Item = {
  isChecked: boolean,
  title: string,
  subtitle: string,
  mode: ConsumptionMode,
  description: string,
  value: number,
  disableSlider: boolean,
  id: number
}


const INITIAL_STATE: Item[] = [
  {
    title: 'Low consumption 🍃',
    subtitle:'Lorem ipsum dolor sit amet, consectetur adipiscing.',
    isChecked: false,
    mode: ConsumptionMode.LOW,
    description: 'Low Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    value: 20,
    disableSlider: true,
    id: 0
  },
  {
    title: 'Performance 🏃‍♂️',
    subtitle:'Lorem ipsum dolor sit amet, consectetur adipiscing.',
    isChecked: false,
    mode: ConsumptionMode.PERFORMANCE,
    description: 'Performance Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    value: 80,
    disableSlider: true,
    id: 1
  },
  {
    title: 'Custom 🛠️',
    subtitle:'Lorem ipsum dolor sit amet, consectetur adipiscing.',
    isChecked: false,
    mode: ConsumptionMode.CUSTOM,
    description: 'Custom Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    value: 50,
    disableSlider: false,
    id: 3
  },
]

const INIT_ITEM = INITIAL_STATE[0];

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  
  private itemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject(INITIAL_STATE);
  private items$: Observable<Item[]> = this.itemsSubject.asObservable()
  
  constructor() {}

  
  initItems(): void {
    chrome.storage.sync.get(['id','energy']).then((result) => {
      const {id, energy} = result;
      console.log('init item', id, energy)
      if(!id || !energy) {
        this.setItems(INIT_ITEM.id, INIT_ITEM.value);
        return;
      }
      this.setItems(id, energy);
    })
  }

  getItems(): Observable<Item[]> {
    return this.items$;
  }

  setItems(id: number, value: number): void {
    const updatedItems = this.itemsSubject.value.map(item => {
      if(item.id === id) {
        item.value = value;
        item.isChecked = true;
      }else {
        item.isChecked = false;
      }
     return item;
    });

    this.itemsSubject.next(updatedItems);
    chrome.storage.sync.set({'energy': value }).then(() => {
      chrome.storage.sync.set({'id': id }).then(() => {
        chrome.runtime.sendMessage({ value }).then((response) => {
          console.log('Value is set to ' + value, id);
        })
      });
    });

  }

  getActiveStatus(): Observable<Item> {
    return this.items$.pipe(
      switchMap(item => item.filter(item => item.isChecked)),
    )
  }

}