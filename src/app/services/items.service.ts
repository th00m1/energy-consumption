import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, switchMap } from 'rxjs';

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
    isChecked: true,
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
  // {
  //   title: 'Smart 🧠',
  //   subtitle:'Lorem ipsum dolor sit amet, consectetur adipiscing.',
  //   isChecked: false,
  //   mode: ConsumptionMode.SMART,
  //   description: 'Smart Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  //   id: 2
  // },
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

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  
  private itemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject(INITIAL_STATE);
  private items$: Observable<Item[]> = this.itemsSubject.asObservable()
  
  constructor() {}

  


  getItems(): Observable<Item[]> {
    return this.items$;
  }

  setItems(id: number): void {
    const updatedItems = this.itemsSubject.value.map(item => {
     return {...item, isChecked: id === item.id} 
    });
    this.itemsSubject.next(updatedItems);
  }

  getActiveStatus(): Observable<Item> {
    return this.items$.pipe(
      switchMap(item => item.filter(item => item.isChecked)),
    )
  }

}