import { Component } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html'
})
export class AccountSettingsComponent {
  changeTheme(theme:string){

    const linkTheme = document.querySelector('#theme')
    const url = `./assets/css/colors/${theme}.css`

    linkTheme?.setAttribute('href', url)
    localStorage.setItem('theme',url)
  }
}
