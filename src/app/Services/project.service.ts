import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  basUrl='http://127.0.0.1:8000/';
  constructor(private _HttpClient:HttpClient) { }

  getProjectDetails(data:any):Observable<any>{
    return this._HttpClient.get(this.basUrl+'project/single/'+data)
  };
  addComment(data:any):Observable<any>{
    return this._HttpClient.post(this.basUrl+'project/comment/add',data)
  };
  getComments(data:any):Observable<any>{
    return this._HttpClient.get(this.basUrl+'project/comments/'+data)
  };

projectReport(projectReport:any):Observable<any>{
  return this._HttpClient.post(this.basUrl+'project/report',projectReport)
};

}
