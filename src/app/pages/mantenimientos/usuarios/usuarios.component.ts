import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public from: number = 0;
  public cargando: boolean = true

  constructor(private usuarioService: UsuarioService,private busquedasService:BusquedasService) {}

  ngOnInit(): void {this.cargarUsuarios()}

  cargarUsuarios() {

    this.cargando = true
    
    this.usuarioService
    .cargarUsuarios(this.from)
    .subscribe(({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false
    });
  }

  cambiarPagina(valor: number) {
    this.from += valor;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsuarios) {
      this.from -= valor;
    }
    this.cargarUsuarios()
  }

  buscar(termino:string){

    if(termino.length === 0){
      return this.usuarios = this.usuariosTemp
    }

    this.busquedasService.buscar('usuarios',termino).subscribe(resultados => this.usuarios = resultados)
    return true
  }
}
