import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import {auth} from 'firebase/app'
import {User} from 'src/app/models/user'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged:any=false;
  constructor(public af:AngularFireAuth,
              public af2:AngularFireAuth) { 
                af.authState.subscribe(user=>(this.isLogged=user));
              }
  async createUser(user:User){
    try{
      return await this.af.createUserWithEmailAndPassword(
        user.email,
        user.pass
      )
      }catch(error){
        console.log('algo ha ocurrido')
      }
    }
  
  signInEmail(user:User){
    this.af.signInWithEmailAndPassword(user.email,user.pass)
    .catch(function(error){
      
    })
  }
}
