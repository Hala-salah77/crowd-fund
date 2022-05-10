import { ProjectService } from './../../Services/project.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project!: any;
  projectID!: any

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {
    this.route.params.subscribe((res)=>{
      this.projectID = res['id'];
      this.project = JSON.parse(decodeURIComponent(this.projectID))
      // this.projectService.projectReport(this.projectID).subscribe((response)=> this.project= response)
      // console.log(this.project);
    })

  }

  ngOnInit(): void {
  }

}
