import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { ProjectComponent } from './Components/project/project.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { HeaderComponent } from './Components/header/header.component';
import { SeeMorePipe } from './see-more.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './Components/profile/profile.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { MyProjectsComponent } from './Components/my-projects/my-projects.component';
import { MyDonationsComponent } from './Components/my-donations/my-donations.component';
import{ ProjectDetailsComponent }from './Components/project-details/project-details.component';
import { UserProjectsComponent } from './Components/user-projects/user-projects.component';
import { SearchPipe } from './search.pipe';
import {AuthInterceptorService} from './Services/auth.interceptor'
import { CommonModule } from '@angular/common';
import { NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
//import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    ProjectComponent,
    NotFoundComponent,
    HeaderComponent,
    SeeMorePipe,
    ProfileComponent,
    EditProfileComponent,
    MyProjectsComponent,
    MyDonationsComponent,
    UserProjectsComponent,
    ProjectDetailsComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUsefulSwiperModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgbRatingModule,
    //MatProgressBarModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
