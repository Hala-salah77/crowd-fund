import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/Services/profile.service';
import { FormControl, FormGroup ,Validators } from '@angular/forms';
import { HomeService } from 'src/app/Services/home.service';

declare var $: any;
@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {
  id=localStorage.getItem('id');
  message:any;
  categories:any;
  userProjects:any;
  images : string[] = [];
  constructor(private toastr: ToastrService,private _profile:ProfileService,private _Router:Router,private _home:HomeService) {
    this.getAllProjects();
    this.getAllCategories();
  }

  getAllCategories(){
    this._home.getAllCategories().subscribe((res)=>{
    //console.log(res.projects);
    console.log(res.status);
    if(res.status == 0){
      this.message='There is no projects yet';
    }
    this.categories=res.data;
    console.log(this.categories)

  },
  (error) => {
    console.log(error.error)
  })
  }
  getAllProjects(){
    this._profile.getAllProjects(this.id).subscribe((res)=>{
    console.log(res);
    console.log(res.status);
    if(res.status == 0){
      this.message='There is no projects yet';
    }
    this.userProjects=res.data;
    console.log(this.userProjects)

  },
  (error) => {
    console.log(error.error)
  })
}





showSuccess(msg:any,title:any) {
  this.toastr.success(msg, title);
}

addProject=new FormGroup({
  'title': new FormControl(null,[Validators.required,Validators.minLength(3)]),
  'details': new FormControl(null,[Validators.required,Validators.minLength(3)]),
  'total_target': new FormControl(null,[Validators.required]),
  'category': new FormControl(null,[Validators.required]),
  'end_campaign': new FormControl(null,[Validators.required,Validators.minLength(11)]),
  'images': new FormControl(null,[Validators.required]),
  //'images': new FormControl('', [Validators.required]),
  'tags':new FormControl(null,[Validators.required]),

})


onFileSelect(event:any) {
  if (event.target.files && event.target.files[0]) {
    var filesAmount = event.target.files.length;
    for (let i = 0; i < filesAmount; i++) {
        const file = event.target?.files[0];
        this.addProject.get('images')?.setValue(file);console.log(file)
      }

  }
}



/* onFileSelect(event:any) {
  if (event.target.files && event.target.files[0]) {
    var filesAmount = event.target.files.length;
    for (let i = 0; i < filesAmount; i++) {
      var reader=new FileReader();
      reader.readAsDataURL(event.target?.files[i])
       reader.onload=(events:any)=>{
         this.images.push(events.target.result);
       }
      }
  }
  console.log(this.images)
} */



addingProject(){
  //let imgs:any=this.images
  let userId:any=localStorage.getItem('id');
  console.log(this.addProject.value)
  const formData = new FormData();
  formData.append('images', this.addProject.get('images')?.value);
  //formData.append('images', imgs);
  formData.append( "title", this.addProject.get('title')?.value );
  formData.append( "details", this.addProject.get('details')?.value );
  formData.append( "total_target", this.addProject.get('total_target')?.value );
  formData.append( "end_campaign", this.addProject.get('end_campaign')?.value);
  formData.append( "category", this.addProject.get('category')?.value  );
  formData.append( "tags", this.addProject.get('tags')?.value  );
  formData.append( "owner",userId);
  console.log(formData)
  this._profile.addProject(formData).subscribe((res)=>{
    console.log(res);
    console.log(res.status);
    this.showSuccess('Project Added Successfully',"Add Project");
    this.addProject.reset();
    $(".btn-close").click();
    this.getAllProjects();
    this.message='';

  },
  (error) => {
    console.log(error.error)
  })

}


  ngOnInit(): void {
  }
/* -------------------------------------------------------------------------- */
  navigateToProject(_project: any){
    console.log(_project);

    this._Router.navigate(['/project', _project])
  }

}
