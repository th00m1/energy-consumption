import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnergyEconomyService {
  private energyEconomy: BehaviorSubject<number> = new BehaviorSubject(0);
  energyEconomy$: Observable<number>;

  constructor() {
    this.energyEconomy$ = this.energyEconomy.asObservable();
  }

  listen() {
    chrome.storage.sync.onChanged.addListener((changes) => {
      const { energyEconomy } = changes;

      if (energyEconomy) {
        this.energyEconomy.next(energyEconomy.newValue);
      }
    });
  }

  init() {
    chrome.storage.sync.get('energyEconomy').then((result) => {
      const { energyEconomy } = result;
      if (!energyEconomy) return;

      this.energyEconomy.next(energyEconomy);
    });
  }
}
