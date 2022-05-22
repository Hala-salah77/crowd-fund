import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  topRatedProjectsArray:any;
  token=localStorage.getItem('token');
  image:string='';
  constructor(private _home:HomeService) {
    this.topRatedProjects()
  }
  /* __________________________                     _________________________ */
  /* __________________________ TOP Rated Projects __________________________ */
  topRatedProjects(){
    this._home.topRatedProjects().subscribe((res)=>{
    //console.log("top rated"+res.data);
    console.log(res.status);
    if(res.status == 0){
      this.image='../../../assets/header.webp';
    }
    this.topRatedProjectsArray=res.data;
    console.log(this.topRatedProjectsArray)

  },
  (error) => {
    console.log(error.error)
  })
}

  ngOnInit(): void {

  }

}
