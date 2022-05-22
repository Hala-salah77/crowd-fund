import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { HomeService } from 'src/app/Services/home.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id=localStorage.getItem('id');
  message:any;
  latestProjectsArray:any;
  topRatedProjectsArray:any;
  allProjectsArray:any;
  categories:any;
  featuredProjectsArray:any;
  constructor(private toastr: ToastrService,private _home:HomeService,private _Router:Router) {
    this.latestProjects();
    this.topRatedProjects();
    this.getAllCategories();
    this.getFeaturedProjects();
    this.allProjects();
  }

  /* __________________________                __________________________ */
  /* __________________________ Featured Projects __________________________ */
  getFeaturedProjects(){
    this._home.featuredProjects().subscribe((res)=>{
    console.log(res.status);
    if(res.status == 0){
      this.message='There is no projects yet';
    }
    this.featuredProjectsArray=res.data;
    console.log(this.featuredProjectsArray)

  },
  (error) => {
    console.log(error.error)
  })
}
  /* __________________________                __________________________ */
  /* __________________________ LatestProjects __________________________ */
  latestProjects(){
    this._home.latestProjects().subscribe((res)=>{
    //console.log(res.projects);
    console.log(res.status);
    if(res.status == 0){
      this.message='There is no projects yet';
    }
    this.latestProjectsArray=res.projects;
    console.log(this.latestProjectsArray)

  },
  (error) => {
    console.log(error.error)
  })
}

 /* __________________________                     _________________________ */
  /* __________________________ TOP Rated Projects __________________________ */
  topRatedProjects(){
    this._home.topRatedProjects().subscribe((res)=>{
    //console.log("top rated"+res.data);
    console.log(res.status);
    if(res.status == 0){
      this.message='There is no projects yet';
    }
    this.topRatedProjectsArray=res.data;
    console.log(this.topRatedProjectsArray)

  },
  (error) => {
    console.log(error.error)
  })
}

/* __________________________              __________________________ */
  /* ________________________ All Projects __________________________ */
  allProjects(){
    this._home.getProjects().subscribe((res)=>{
    if(res.status == 0){
      this.message='There is no projects yet';
    }
    this.allProjectsArray=res.data;
    console.log(this.allProjectsArray)

  },
  (error) => {
    console.log(error.error)
  })
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
  ngOnInit(): void {

    $(".menu ul li").click(function(e:any) {
      console.log(e.target)
      $(".menu ul li").removeClass("active");
      $(e.target).addClass("active");
      $(".menu-content").addClass("hide").removeClass("show");
      $('.menu-content.' + e.target.id).toggleClass("show", "hide");
  })
  }


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
