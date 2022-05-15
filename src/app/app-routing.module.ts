import { NgModule } from '@angular/core';
import { NavigationExtras, RouterModule, Routes } from '@angular/router';
import { NotFoundError } from 'rxjs';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ProjectComponent } from './Components/project/project.component';
import { RegisterComponent } from './Components/register/register.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { MyDonationsComponent } from './Components/my-donations/my-donations.component';
import { MyProjectsComponent } from './Components/my-projects/my-projects.component';
import { AuthGuard } from './Guards/auth.guard';
import { ProjectDetailsComponent } from './Components/project-details/project-details.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'project/details/:id',component:ProjectDetailsComponent},
  {path:'myproject/details/:id',component:ProjectComponent},
  {path:'profile',canActivate:[AuthGuard],component:ProfileComponent},
  {path:'profile/myprojects',canActivate:[AuthGuard],component:MyProjectsComponent},
  {path:'profile/mydonations',canActivate:[AuthGuard],component:MyDonationsComponent},
  {path:'**',component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
