import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { User } from 'src/app/models/user'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;
  constructor(public af: AngularFireAuth, public auth:AngularFireAuth) {
    this.af.authState.subscribe(user => (this.isLogged = user));
  }

  async createUser(user: User) {
      return  this.af.createUserWithEmailAndPassword(user.email, user.pass)
      .catch(function(error) {
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
