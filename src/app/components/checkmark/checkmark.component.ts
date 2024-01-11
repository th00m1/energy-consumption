import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkmark',
  templateUrl: './checkmark.component.html',
  styleUrls: ['./checkmark.component.scss'],
})
export class CheckmarkComponent {
  @Input() isChecked = false;

  change(): void {
    console.log('change');
  }
}
