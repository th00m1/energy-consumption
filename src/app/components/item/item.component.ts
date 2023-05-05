import { Component, Input } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input('isChecked') isChecked = false;
  @Input('title') title = '';
  @Input('subtitle') subtitle = '';
  @Input('id') id = -1;
  @Input('value') value = 0;

  constructor(private itemsService: ItemsService) {}
  checkItem(): void {
    this.itemsService.setItems(this.id, this.value);
  }
}
