
import { Component, OnInit , OnChanges, SimpleChanges, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/Services/project.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { SwiperOptions } from 'swiper';

declare var $: any;
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit{
starRating=0;
sendRating=0;
id:any=this._Activatedroute.snapshot.params["id"];
projectDetails:any;
comments:any;
tag:any;
similar:any;
commentId:any;
progress:number=0;
  constructor(private _Activatedroute: ActivatedRoute,private _ProjectService:ProjectService,private toastr: ToastrService ,private _Router:Router) {
    this.id=this._Activatedroute.snapshot.params["id"];
    console.log(this.id);
    this.getProjectDetails();
    this.getAllComments();
  }

  comment:FormGroup=new FormGroup({
    'comment': new FormControl(null,[Validators.required]),
  });
  projectReport:FormGroup=new FormGroup({
    'reason': new FormControl(null,[Validators.required]),
  });
  commentReport:FormGroup=new FormGroup({
    'reason': new FormControl(null,[Validators.required]),
  });

  donation:FormGroup=new FormGroup({
    paid_up: new FormControl(null,[Validators.required]),
  });

  showSuccess(msg:any,title:any) {
    this.toastr.success(msg, title);
  }
  showFaile(msg:any,title:any) {
    this.toastr.error(msg, title);
  }

  addCommet(){
    let token=localStorage.getItem('token');
    if(token){
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
      else{
        this.showFaile('Please Login first before Writting your Comment',"Comment");
      $(".btn-close").click();
      this._Router.navigate(['/login']);
      }

  }

  addProjectReport(){
    let token=localStorage.getItem('token');
    if(token){
      let userId:any=localStorage.getItem('id');
      const formData = new FormData();
      formData.append( "reason", this.projectReport.get('reason')?.value );
      formData.append( "user",userId);
      formData.append( "project",this.id);
      console.log(formData);
      this._ProjectService.projectReport(formData).subscribe((res)=>{
        if(res.status == 1){
          console.log(res.data);
          this.showSuccess('Report Added Successfully',"Report");
          $(".btn-close").click();
        }
        else {
          console.log("response "+res.message_error);
        }
      },
      (error) => {
        //this.errorMessage=error.error.message_error;
      })
    }
    else{
      this.showFaile('Please Login first before Reporting',"Reporting");
      $(".btn-close").click();
      this._Router.navigate(['/login']);
    }


  }

  addDonation(){
    let token=localStorage.getItem('token');
    if(token){
      let userId:any=localStorage.getItem('id');
      let dollar:number=this.donation.get('paid_up')?.value;
      let data={
        "paid_up": dollar,
        "user":userId,
        "project":this.id
      }
      this._ProjectService.donate(data).subscribe((res)=>{
        if(res.status == 1){
          console.log(res.data);
          this.showSuccess('Donation Added Successfully',"Donation");
          $(".btn-close").click();
          this.getProjectDetails();
        }
        else {
          console.log("response "+res.message_error);
        }
      },
      (error) => {
        //this.errorMessage=error.error.message_error;
      })
      }
      else{
        this.showFaile('Please Login first before Donation',"Donation");
        $(".btn-close").click();
        this._Router.navigate(['/login']);
      }


  }

  getCommentId(id:any){
    this.commentId=id;
  }

  addCommentReport(){
    let token=localStorage.getItem('token');
    if(token){
        let userId:any=localStorage.getItem('id');
        const formData = new FormData();
        formData.append( "reason", this.commentReport.get('reason')?.value );
        formData.append( "user",userId);
        formData.append( "comment",this.commentId);
        console.log(formData);
        this._ProjectService.commentReport(formData).subscribe((res)=>{
          if(res.status == 1){
            this.commentReport.reset();
            this.showSuccess('Report Added Successfully',"Report");
            $(".btn-close").click();
          }
          else {
            console.log("response "+res.message_error);
          }
        },
        (error) => {
          //this.errorMessage=error.error.message_error;
        })
    }
    else{
      this.showFaile('Please Login first before Report This Comment',"Report");
      $(".btn-close").click();
      this._Router.navigate(['/login']);
    }

  }


  sendingRate(){
    let token=localStorage.getItem('token');
    if(token){
      let data={
        rate:this.sendRating,
        project:this.id,
        user:localStorage.getItem('id')
      }
      console.log(data);
      this._ProjectService.addRate(data).subscribe((res)=>{
        if(res.status == 1){
          console.log(res.data);
          $(".btn-close").click();
          this.showSuccess('Rate Added Successfully',"Rating");
          this.getProjectDetails();
        }
        else {
          console.log("response "+res.message_error);
        }
      },
      (error) => {
        //this.errorMessage=error.error.message_error;
      })
    }
    else{
      this.showFaile('Please Login first before Rate this project',"Rating");
      $(".btn-close").click();
      this._Router.navigate(['/login']);
    }


  }


/* ______________________                   ___________________
__________________________ Get Project Details ____________________*/

getProjectDetails(){
  this._ProjectService.getProjectDetails(this.id).subscribe((res)=>{
  console.log(res.data);
  this.projectDetails=res.data;
  this.tag=res.data.tags[0].tag;
  this.starRating=res.data.rate;
  console.log(this.starRating);
  console.log(this.tag);
  this.getSimilarProjects(this.tag);
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
/* ______________________                       ___________________
__________________________ Get Similar Projects ____________________*/

getSimilarProjects(tag:any){
  this._ProjectService.getSimilarProjects(tag).subscribe((res)=>{
  console.log(res.data);
  this.similar=res.data;
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
    this.id=this._Activatedroute.snapshot.params["id"];
    console.log(this.id);
    this.getProjectDetails();
    this.getAllComments();
  }
/* ______________________                      _____________________
__________________________ Swiper Configration ____________________*/
  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    slidesPerView: 1,
    spaceBetween: 20,
    scrollbar: { draggable: true },
    breakpoints:{
      '100': {
        slidesPerView: 1,
        spaceBetween: 20
      },
      '768': {
        slidesPerView: 3,
        spaceBetween: 40
      },
      '1024': {
        slidesPerView: 4,
        spaceBetween: 50
      }
    }
  };

}
