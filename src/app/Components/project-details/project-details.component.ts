import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
id:any;
projectDetails:any;
comments:any;
  constructor(private _Activatedroute: ActivatedRoute,private _ProjectService:ProjectService,private toastr: ToastrService) {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    console.log(this.id);
    this.getAllProfileData();
    this.getAllComments();
  }

  comment:FormGroup=new FormGroup({
    'comment': new FormControl(null,[Validators.required]),

  });

  showSuccess(msg:any,title:any) {
    this.toastr.success(msg, title);
  }

  addCommet(){
    let userId:any=localStorage.getItem('id');
    const formData = new FormData();
    formData.append( "comment", this.comment.get('comment')?.value );
    formData.append( "user",userId);
    formData.append( "project",this.id);
    console.log(formData);
    this._ProjectService.addComment(formData).subscribe((res)=>{
      if(res.status == 1){
        console.log(res.data);
        this.showSuccess('Comment Added Successfully',"Comment");
        this.comment.reset();
        this.getAllComments();
      }
      else {
        console.log("response "+res.message_error);
      }
    },
    (error) => {
      //this.errorMessage=error.error.message_error;
    })

  }


  /* ______________________                   ___________________
__________________________ Get User Profile ____________________*/

getAllProfileData(){
  this._ProjectService.getProjectDetails(this.id).subscribe((res)=>{
  console.log(res.data);
  this.projectDetails=res.data;
},
(error) => {
  console.log(error.error)
})
}


/* ______________________                        ___________________
__________________________ Get Project Comments ____________________*/

getAllComments(){
  this._ProjectService.getComments(this.id).subscribe((res)=>{
    if(res.status==1){
      this.comments=res.data;
    }
  console.log(res.data);

},
(error) => {
  console.log(error.error)
})
}


  ngOnInit(): void {

  }

}
