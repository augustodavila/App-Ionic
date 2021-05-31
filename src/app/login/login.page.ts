import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService, public router: Router ) { }

  ngOnInit() {
    
  }
  OnSubmitLogin(){
    this.authService.login(this.email, this.password).then( res => { 
      this.router.navigate(['/home/materias']);
     }).catch(err => alert('Datos incorrectos o Usuario inexistente'));
  }
  goToReset(){
    this.router.navigateByUrl('reset')
  }
  goToRegistro(){
    this.router.navigateByUrl('registro')
  }
}
