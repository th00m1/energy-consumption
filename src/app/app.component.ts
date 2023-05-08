import { Component, OnInit } from '@angular/core';
import { ItemsService } from './services/items.service';
import { HttpClient } from '@angular/common/http';

declare var Chrome: typeof chrome;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-scss-boilerplate';

  constructor(private itemsService: ItemsService) {
    this.itemsService.initItems();
  }

  ngOnInit() { 
    chrome.storage.sync.get(['energy', 'id']).then((result) => {
      const { energy, id } = result;
      if(!energy || !id) return;
      this.itemsService.setItems(id, energy);
      chrome.runtime.sendMessage({ value: energy }, (response) => {
        console.log(response);
      });
    });
  }

}
