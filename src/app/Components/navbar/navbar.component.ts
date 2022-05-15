import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { HomeService } from 'src/app/Services/home.service';
import { ProfileService } from 'src/app/Services/profile.service';

declare var $: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(public _AuthService:AuthService,private _Router:Router,private _home:HomeService,private _profile:ProfileService) {
    this.allProjects();

  }
  id=localStorage.getItem('id');
  profileImage:any;
  term:any;
  searchProjectsArray:any;
  name=localStorage.getItem('name');
  closeSearch(){
    $(".search-bar").slideToggle(300);
    $(".fixed-layer").delay( 300 ).fadeOut();

  }
  /* __________________________              __________________________ */
  /* ________________________ All Projects __________________________ */
  allProjects(){
    this._home.getProjects().subscribe((res)=>{
    if(res.status == 0){
      this.searchProjectsArray='There is no projects yet';
    }
    this.searchProjectsArray=res.data;
    console.log(this.searchProjectsArray)

  },
  (error) => {
    console.log(error.error)
  })
}

/* ______________________                   ___________________
__________________________ Get User Profile ____________________*/

getAllProfileData(){
  this._profile.getAllProfileData(this.id).subscribe((res)=>{
  console.log(res.data);
  this.profileImage=res.data.profile_image;
  console.log(this.profileImage);
},
(error) => {
  console.log(error.error)
})
}
  logout(){
    localStorage.clear();
    this._Router.navigate(['/login'])
  }
  ngOnInit(): void {
    this.getAllProfileData();
    $(".nav-toggle").click(function () {
      $(".nav-toggle .dropdown-menu").slideToggle(300);

    });
      /* Search */
      $(".search").click(function () {
        $(".fixed-layer").fadeIn();
        $(".search-bar").slideToggle(300);

      });
      $(".fixed-layer .close").click(function (e:any) {
        $(".search-bar").slideToggle(300);
        $(".fixed-layer").delay( 300 ).fadeOut();
      });
  }

}
