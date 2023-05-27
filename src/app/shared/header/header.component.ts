import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
 
declare let $: any; //*****IMPORTANTE DECLARAR variable $
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit, AfterViewInit {
 
 
  public usuario: Usuario;
 
  constructor(private usuarioService: UsuarioService,
    private router: Router) {
    this.usuario = usuarioService.usuario;
  }
 
  ngOnInit(): void {
 
  }
 
  ngAfterViewInit(): void {
    //NOTA: esta funcion esta en el archivo "custom.js"
    $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
      $(".app-search").toggle(200);
    });
  }
 
  buscar(strBusqueda: string) {
    console.log(strBusqueda);
  }
 
  logout() {
    this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }
}