import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  @ViewChild('googleBtn') googleBtn: ElementRef;

  public formSubmitted = false;
  public auth2: any;

  loginForm: FormGroup; //Agregar el loginForm en un FormGroup, e importar desde: import { FormGroup } from '@angular/forms';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {
    //Esta parte moverlo dentro de los corchetes del constructor
    this.loginForm = this.fb.group({
      email: [
        localStorage.getItem('email') || '',
        [Validators.required, Validators.email],
      ],
      password: ['', Validators.required],
      remember: [false],
    });
  }
  ngOnInit(): void {
    this.startApp()
  }


  login() {

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        if ( this.loginForm.get('remember').value ){ 
          localStorage.setItem('email', this.loginForm.get('email').value );
        } else {
          localStorage.removeItem('email');
        }

        // Navegar al Dashboard
        this.router.navigateByUrl('/');

      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error' );
      });

  }
  

  async startApp() {
    
    this.auth2 = this.usuarioService.auth2;

  };

}