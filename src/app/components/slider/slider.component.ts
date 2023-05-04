import { Component, Input } from '@angular/core';
import { ConsumptionMode } from 'src/app/services/items.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  @Input('isDisabled') isDisabled: boolean = false;
  @Input('value') value: number = 0;
  @Input('mode') mode: ConsumptionMode = ConsumptionMode.LOW;
}
  