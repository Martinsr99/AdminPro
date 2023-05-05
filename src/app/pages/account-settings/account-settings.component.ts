import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html'
})
export class AccountSettingsComponent {
    ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
    
  }

  constructor(private settingsService: SettingsService){
    
  }
  
  changeTheme(theme:string){
    
    this.settingsService.changeTheme(theme)
  }


}
