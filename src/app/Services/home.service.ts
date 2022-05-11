import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  basUrl='http://127.0.0.1:8000/';
  constructor(private _HttpClient:HttpClient) { }

  latestProjects():Observable<any>{
    return this._HttpClient.get(this.basUrl+'project/latest')
  };
  featuredProjects():Observable<any>{
    return this._HttpClient.get(this.basUrl+'project/latestAdminSelected')
  };
  topRatedProjects():Observable<any>{
    return this._HttpClient.get(this.basUrl+'project/highestRate')
  };
  getAllCategories():Observable<any>{
    return this._HttpClient.get(this.basUrl+'project/categories')
  };
  getProjects():Observable<any>{
    return this._HttpClient.get(this.basUrl+'project')
  };
}
