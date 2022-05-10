import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(projects:any[],term:string): any {
    if(term === undefined)
      return [];

    return projects.filter(function(projects){
      return projects.title.toLowerCase().includes(term.toLowerCase());
    })
  }

}
