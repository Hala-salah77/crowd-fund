import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/Services/profile.service';
@Component({
  selector: 'app-my-donations',
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.css']
})
export class MyDonationsComponent implements OnInit {
  id=localStorage.getItem('id');
  message:any;
  userProjects:any;
  constructor(private toastr: ToastrService,private _profile:ProfileService,private _Router:Router) { this.getAllDonations();}

  getAllDonations(){
    this._profile.getAllDonations(this.id).subscribe((res)=>{
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

  ngOnInit(): void {
  }

}
