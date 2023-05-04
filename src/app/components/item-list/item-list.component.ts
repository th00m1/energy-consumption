import { Component } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  
  constructor(private itemsService: ItemsService) {}
  
  activeItem$ = this.itemsService.getActiveStatus();
  items$ = this.itemsService.getItems();
}
