import { Component, ViewChild, ElementRef, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit,AfterViewInit {

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

  ngAfterViewInit(): void {
    this.googleInit();
  }

  ngOnInit(): void {
    this.startApp()
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '556660919037-og65tufivptiheli7nl7lvgi8pd4ip8c.apps.googleusercontent.com',
      callback:(response:any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    console.log('Encoded JWT ID token: ' + response.credential);
    this.usuarioService.loginGoogle(response.credential).subscribe(resp => {
      console.log({login:resp})
      this.router.navigateByUrl('/')
    })
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