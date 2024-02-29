import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private itemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject(
    INITIAL_STATE
  );
  private items$: Observable<Item[]> = this.itemsSubject.asObservable();

  initItems(): void {
    chrome.storage.sync.get(['id', 'energy']).then((result) => {
      const { id, energy } = result;
      if (!id || !energy) {
        this.setItems(INIT_ITEM.id, INIT_ITEM.value);
        return;
      }
      this.setItems(id, energy);
    });
  }

  getItems(): Observable<Item[]> {
    return this.items$;
  }

  setItems(id: number, value: ConsumptionMode): void {
    const updatedItems = this.itemsSubject.value.map((item) => {
      if (item.id === id) {
        item.value = value;
        item.isChecked = true;
      } else {
        item.isChecked = false;
      }
      return item;
    });

    this.itemsSubject.next(updatedItems);
    chrome.storage.sync
      .set({ energy: value })
      .then(() => {
        chrome.storage.sync
          .set({ id: id })
          .then(() => {
            chrome.runtime.sendMessage({ value }).then(() => {
              console.log('Value is set to ' + value, id);
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getActiveStatus(): Observable<Item> {
    return this.items$.pipe(
      switchMap((item) => item.filter((item) => item.isChecked))
    );
  }
}

export enum ConsumptionMode {
  LOW = 'eco',
  BALANCE = 'balanced',
  PERFORMANCE = 'high',
}

export type Item = {
  isChecked: boolean;
  title: string;
  subtitle: string;
  mode: ConsumptionMode;
  value: ConsumptionMode;
  id: number;
};

const INITIAL_STATE: Item[] = [
  {
    title: 'Low consumption 🍃',
    subtitle: 'Reduce your energy consumption by decreasing the performance.',
    isChecked: false,
    mode: ConsumptionMode.LOW,
    value: ConsumptionMode.LOW,
    id: 0,
  },
  {
    title: 'Balance ⚖️',
    subtitle:
      'The best possible performance based on the green energy available',
    isChecked: false,
    mode: ConsumptionMode.BALANCE,
    value: ConsumptionMode.BALANCE,
    id: 3,
  },
  {
    title: 'Performance 🏃‍♂️',
    subtitle: 'Best performance but high energy consumption.',
    isChecked: false,
    mode: ConsumptionMode.PERFORMANCE,
    value: ConsumptionMode.PERFORMANCE,
    id: 1,
  },
];

const INIT_ITEM = INITIAL_STATE[0];
