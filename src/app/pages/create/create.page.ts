import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router'
import { User } from '../../models/user'
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service'
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public myForm: FormGroup;
  user: User = new User();
  email;password;
  constructor(private router: Router, 
              private auth: AuthService, 
              private form: FormBuilder,
              public toaster:ToastController,
              public loader:LoadingController) { }

  ngOnInit() {
    this.validations();
  }
  validations(): void {
    this.myForm = this.form.group({
      email: ['', Validators.compose([
        Validators.pattern('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.]+[.][a-zA-Z0-9]+')])],
      password: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z0-9]+')
      ])]
    });
  }
  getUser(){
    this.user.email=this.myForm.get('email').value;
    this.user.pass=this.myForm.get('password').value;
  }
  registration() {
    this.getUser();
    const user =  this.auth.createUser(this.user)
    if (this.user) {
      this.LoadPag();
      this.createToast()
      this.router.navigateByUrl('./tabs')
    }
  }
  redirectLogin(){
    this.router.navigateByUrl('/login');
  }
  async createToast() {
    const toast = await this.toaster.create({
      message: 'Login correcto',
      duration: 500
    });
    toast.present();
  }
  async LoadPag() {
    const loading = await this.loader.create({
      message: 'Por favor,espera',
      duration: 2000,
    });
    this.createToast();
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
