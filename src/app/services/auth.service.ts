import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { User } from 'src/app/models/user'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;
  constructor(public af: AngularFireAuth, public auth: AngularFireAuth, public mm: AngularFireAuthModule) {
    this.af.authState.subscribe(user => (this.isLogged = user));
  }
  getUser(){
    
  }
  createUser(user: User) {
    this.af.createUserWithEmailAndPassword(user.email, user.pass)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

  signInEmail(user: User) {
    this.af.signInWithEmailAndPassword(user.email, user.pass)
      .catch(function (error) {
      })
  }
}
