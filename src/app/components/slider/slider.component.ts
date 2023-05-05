import { Component, Input, OnInit } from '@angular/core';
import { ConsumptionMode, ItemsService } from 'src/app/services/items.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input('isDisabled') isDisabled: boolean = false;
  @Input('value') value: number = 0;
  @Input('mode') mode: ConsumptionMode = ConsumptionMode.LOW;
  @Input('id') id: number = 0;

  sliderValue = new FormControl({value: 0, disabled: this.isDisabled});

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.sliderValue.setValue(this.value);

  }

  valueChanged() {
    const { value } = this.sliderValue;
    if(!value) return;
    chrome.storage.sync.set({'energy': value }).then(() => {
      chrome.storage.sync.set({'id': this.id }).then(() => {
        chrome.runtime.sendMessage({ value }).then((response) => {
          this.itemsService.setItems(this.id, value);
        });
      })
    });

  }


}
