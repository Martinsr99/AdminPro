import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../environments/environment';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():string{
    return this.usuario.uid || ''
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  logout() {
    localStorage.removeItem('token');

    this.router.navigateByUrl('/login');
  }

  validarToken(): Observable<boolean> {

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const { email, google, nombre, role, img = '', uid } = resp.usuario;

          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

          localStorage.setItem('token', resp.token);

          return true;
        }),
        catchError((error) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  actualizarPerfil(data: {email:string,nombre:string,role:string}){

    data = {
      ...data,
      role:this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`,data,{
      headers: {
        'x-token': this.token
      }
    })
  }

  loginGoogle(token:string){
    return this.http.post(`${base_url}/login/google`,{token}).pipe(tap((resp:any) => {
      localStorage.setItem('token',resp.token),
      console.log(resp)
    }))
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  cargarUsuarios(from:number = 0) {
    const url = `${base_url}/usuarios?from=${from}`;
    return this.http.get<CargarUsuario>(url,this.headers)
    .pipe(
      map(resp => {
        const usuarios = resp.usuarios.map(
          user => new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid)
        )
        return {
          total: resp.total,
          usuarios
        }
      })
    )
  }
}
