import { Component } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-energy-info',
  templateUrl: './energy-info.component.html',
  styleUrls: ['./energy-info.component.scss']
})
export class EnergyInfoComponent {
  constructor(private itemsService: ItemsService) {}

  activeItem$ = this.itemsService.getActiveStatus();
}
