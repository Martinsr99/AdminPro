import { Component } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions()
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent {

  constructor(private settingsService: SettingsService){}

  ngOnInit():void{
    customInitFunctions()

  }

}

