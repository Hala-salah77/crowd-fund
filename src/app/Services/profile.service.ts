import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

basUrl='http://127.0.0.1:8000/';
  constructor(private _HttpClient:HttpClient) { }
  updateProfile(updateProfile:any):Observable<any>{
    return this._HttpClient.post(this.basUrl+'user/update',updateProfile)
  };
  addProject(data:any):Observable<any>{
    return this._HttpClient.post(this.basUrl+'project/add',data)
  };
  getAllProfileData(data:any):Observable<any>{
    return this._HttpClient.get(this.basUrl+'user/profile/'+data)
  };
  getAllProjects(data:any):Observable<any>{
    return this._HttpClient.get(this.basUrl+'user/projects/'+data)
  };
  getAllDonations(data:any):Observable<any>{
    return this._HttpClient.get(this.basUrl+'user/donations/'+data)
  };
  deleteProfile(id:any):Observable<any>{
    return this._HttpClient.delete(this.basUrl+'user/delete/'+id)
  };
  cancleProject(id:any):Observable<any>{
    return this._HttpClient.delete(this.basUrl+'project/cancel/'+id)
  };
}
