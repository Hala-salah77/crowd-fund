import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  basUrl='http://127.0.0.1:8000/';
  constructor(private _HttpClient:HttpClient) { }
    register(registerForm:any):Observable<any>{
      return this._HttpClient.post(this.basUrl+'user/register',registerForm)
    };
    login(loginForm:any):Observable<any>{
      return this._HttpClient.post(this.basUrl+'user/login',loginForm)
    }
    signOut(data:any):Observable<any>{
      return this._HttpClient.post(this.basUrl+'user/logout',data)
    }
    isLoggedIn(){
      return !!localStorage.getItem('token');
    }
}
