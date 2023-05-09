import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConsumptionMode, ItemsService } from 'src/app/services/items.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnChanges {
  @Input() isDisabled = false;
  @Input() value = 0;
  @Input() mode: ConsumptionMode = ConsumptionMode.LOW;
  @Input() id = 0;

  sliderValue = new FormControl({value: 0, disabled: this.isDisabled});

  constructor(private itemsService: ItemsService) { 
    console.log(this.id, this.value, this.mode, this.isDisabled)
  }

  ngOnInit() {
    this.isDisabled ? this.sliderValue.disable() : this.sliderValue.enable();
    this.sliderValue.setValue(this.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { id } = changes;
    if(id && (id.currentValue !== id.previousValue)) {
      this.isDisabled ? this.sliderValue.disable() : this.sliderValue.enable();
    }
  }

  valueChanged() {
    const { value } = this.sliderValue;
    if(!value) return;

    chrome.runtime.sendMessage({ value }).then((response) => {
      this.itemsService.setItems(this.id, value);
    });
  }


}
