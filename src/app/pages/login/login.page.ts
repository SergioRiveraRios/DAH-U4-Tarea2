import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'

import { User } from 'src/app/models/user'
import { Router } from '@angular/router'
import { ToastController, LoadingController,AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;
  user: User = new User();
  constructor(
    private auths: AuthService,
    private fb: FormBuilder,
    public router: Router,
    public toaster: ToastController,
    public load: LoadingController,
    public alert:AlertController) { }

  ngOnInit() {
    this.validations();
  }
  validations(): void {
    this.myForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.pattern('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.]+[.][a-zA-Z0-9]+')])],
      password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern('[a-zA-Z0-9]+')
      ])]
    });
  }
  async createToast() {
    const toast = await this.toaster.create({
      message: 'Login correcto',
      duration: 500
    });
    toast.present();
  }
  async LoadPag() {
    const loading = await this.load.create({
      message: 'Por favor,espera',
      duration: 2000,
    });
    this.createToast();
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async Login() {
    const user= await this.auths.signInEmail(this.user);
    if(user){
      this.LoadPag();
      this.createToast();
      this.router.navigateByUrl('../../tabs');
    }
    else{
      const alert = await this.alert.create({
        header: 'Datos incorrectos',
        message:'Datos introducidos erroneos',
        buttons:[{
          text:'Salir'
        }]
      });
      await alert.present();
    }
  }
  redirectCreate(){
    this.router.navigateByUrl('/create')
  }
}
