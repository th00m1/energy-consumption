import { Component, OnInit, inject } from '@angular/core';
import { ItemsService } from './services/items.service';
import { EnergyEconomyService } from './services/energy-economy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'chrome-extension-manage-energy-consumption';
  private energyEconomyService = inject(EnergyEconomyService);
  private itemsService = inject(ItemsService);

  constructor() {
    this.itemsService.initItems();
    this.energyEconomyService.init();
    this.energyEconomyService.listen();
  }

  ngOnInit() {
    chrome.storage.sync.get(['energy', 'id']).then((result) => {
      const { energy, id } = result;
      if (!energy || !id) return;
      this.itemsService.setItems(id, energy);
      chrome.runtime.sendMessage({ value: energy }, (response) => {
        console.log(response);
      });
    });
  }
}
