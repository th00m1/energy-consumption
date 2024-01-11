import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-energy-menu',
  templateUrl: './energy-menu.component.html',
  styleUrls: ['./energy-menu.component.scss'],
})
export class EnergyMenuComponent {
  activeItem: Observable<Item> = this.itemsService.getActiveStatus();

  constructor(private itemsService: ItemsService) {}
}
