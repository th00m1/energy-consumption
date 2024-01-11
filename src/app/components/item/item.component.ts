import { Component, Input } from '@angular/core';
import { ConsumptionMode, ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() isChecked = false;
  @Input() title = '';
  @Input() subtitle = '';
  @Input() id = -1;
  @Input() value = ConsumptionMode.LOW;

  constructor(private itemsService: ItemsService) {}
  checkItem(): void {
    this.itemsService.setItems(this.id, this.value);
  }
}
