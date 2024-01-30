import { Component, OnInit, inject } from '@angular/core';
import { EnergyEconomyService } from 'src/app/services/energy-economy.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-energy-menu',
  templateUrl: './energy-menu.component.html',
  styleUrls: ['./energy-menu.component.scss'],
})
export class EnergyMenuComponent implements OnInit {
  private itemsService = inject(ItemsService);
  private energyEconomyService = inject(EnergyEconomyService);

  activeItem$ = this.itemsService.getActiveStatus();
  energyEconomy$ = this.energyEconomyService.energyEconomy$;

  ngOnInit(): void {
    this.energyEconomy$.subscribe((d) => console.log({ d }));
  }
}
