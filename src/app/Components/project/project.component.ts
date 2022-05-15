import { ProjectService } from './../../Services/project.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/Services/profile.service';
declare var $: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectId:any;
  commentMessage:string='';
  starRating=0;
  id:any=this._Activatedroute.snapshot.params["id"];
  projectDetails:any;
  comments:any;
  progress:number=0;
  constructor(private _Activatedroute: ActivatedRoute,private _profile:ProfileService, private _ProjectService: ProjectService,private toastr: ToastrService,private _Router:Router) {
    this.id=this._Activatedroute.snapshot.params["id"];
    console.log(this.id);
    this.getProjectDetails();
    this.getAllComments();
  }
  showSuccess(msg:any,title:any) {
    this.toastr.success(msg, title);
  }
  /* ______________________                   ___________________
__________________________ Get Project Details ____________________*/

getProjectDetails(){
  this._ProjectService.getProjectDetails(this.id).subscribe((res)=>{
  console.log(res.data);
  this.projectDetails=res.data;
  this.starRating=res.data.rate;
  console.log(this.starRating);
  if(res.data.current_donation===res.data.total_target){
    this.progress=100;
  }
  else if(res.data.current_donation ==0){
    this.progress=0
  }
  else{
    this.progress=(res.data.total_target-res.data.current_donation)/100;
  }

  console.log(this.progress)
},
(error) => {
  console.log(error.error)
})
}

/* ______________________                        ___________________
__________________________ Get Project Comments ____________________*/

getAllComments(){
  this._ProjectService.getComments(this.id).subscribe((res)=>{
    if(res.status==1)
      this.comments=res.data;

    if(res.data.length==0)
      this.commentMessage='There are no Comments yet'
},
(error) => {
  console.log(error.error)
})
}

getId(id:number){
  this.projectId=id;
}
cancleProject(){
  this._profile.cancleProject(this.projectId).subscribe((res)=>{
  console.log(res.status);
  if(res.status ==1 )
    {
      $(".btn-close").click();
      this.showSuccess('Project Canceled Successfully',"Cancel Project");
      this._Router.navigate(['/profile/myprojects']);

    }

},
(error) => {
  console.log(error.error)
})
}
  ngOnInit(): void {
  }

}
