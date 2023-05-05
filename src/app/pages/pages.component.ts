import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent {
  public linkTheme = document.querySelector('#theme')

  constructor(){}

  ngOnInit():void{
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css'
    if(this.linkTheme){
      this.linkTheme.setAttribute('href', url)
    }

  }

}
