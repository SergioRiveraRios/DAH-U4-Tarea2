import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router'
import { User } from '../../models/user'
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public myForm: FormGroup;
  user: User = new User();
  constructor(private router: Router, private auth: AuthService, private form: FormBuilder) { }

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
  async registration() {
    const user = await this.auth.createUser(this.user);
    if (this.user) {
      console.log('cread');
      this.router.navigateByUrl('/tabs/tab1');
    }
  }
  redirectLogin(){
    this.router.navigateByUrl('/login');
  }
}
