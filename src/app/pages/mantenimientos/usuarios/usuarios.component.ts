import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public from: number = 0;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {this.cargarUsuarios()}

  cargarUsuarios() {
    this.usuarioService
      .cargarUsuarios(this.from)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
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
}
