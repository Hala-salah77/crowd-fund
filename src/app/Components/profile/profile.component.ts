import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { ProfileService } from 'src/app/Services/profile.service';
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id=localStorage.getItem('id');
  userData:any;
  constructor(private toastr: ToastrService,private _profile:ProfileService,private _Router:Router) { this.getAllProfileData();}

  showSuccess(msg:any,title:any) {
    this.toastr.success(msg, title);
  }



  updateProfile=new FormGroup({
    'is_verifications':new FormControl(true),
    'id':new FormControl(null),
    'first_name': new FormControl([Validators.required,Validators.minLength(3)]),
    'last_name': new FormControl([Validators.required,Validators.minLength(3)]),
    'email': new FormControl([Validators.required,Validators.email]),
    'password': new FormControl([Validators.required,Validators.minLength(6)]),
    'mobile_phone': new FormControl([Validators.required,Validators.minLength(11)]),
    'profile_image': new FormControl([Validators.required]),
    'facebook_profile':new FormControl(null),
    'Birth_date':new FormControl(null),
    'country':new FormControl(null),
  })

  setValues(){
    this.updateProfile.controls['id'].setValue(this.userData.id);
    this.updateProfile.controls['first_name'].setValue(this.userData.first_name);
    this.updateProfile.controls['last_name'].setValue(this.userData.last_name);
    this.updateProfile.controls['email'].setValue(this.userData.email);
  /*this.updateProfile.controls['password'].setValue(this.userData.password);*/
     this.updateProfile.controls['mobile_phone'].setValue(this.userData.mobile_phone);
    this.updateProfile.controls['facebook_profile'].setValue(this.userData.facebook_profile);
    this.updateProfile.controls['Birth_date'].setValue(this.userData.Birth_date);
    this.updateProfile.controls['country'].setValue(this.userData.country);
  }

  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target?.files[0];
      this.updateProfile.get('profile_image')?.setValue(file);
    }
  }

  getUpdated() {
    const formData = new FormData();
    formData.append('is_verifications', this.updateProfile.get('is_verifications')?.value);
    formData.append('profile_image', this.updateProfile.get('profile_image')?.value);
    formData.append( "first_name", this.updateProfile.get('first_name')?.value );
    formData.append( "last_name", this.updateProfile.get('last_name')?.value );
    formData.append( "email", this.updateProfile.get('email')?.value );
    formData.append( "mobile_phone", this.updateProfile.get('mobile_phone')?.value  );
    /* formData.append( "password", this.updateProfile.get('password')?.value  ); */
    formData.append( "facebook_profile", this.updateProfile.get('facebook_profile')?.value  );
    formData.append( "Birth_date", this.updateProfile.get('Birth_date')?.value  );
    formData.append( "country", this.updateProfile.get('country')?.value  );
    formData.append( "id", this.updateProfile.get('id')?.value  );
    console.log(formData)
    this._profile.updateProfile(formData).subscribe((res)=>{
      console.log(res);
      console.log(res.status);
      this.showSuccess('User Updated Successfully',"Profile Upates");
      this.updateProfile.reset();
      $(".btn-close").click();
      this.getAllProfileData();
      localStorage.setItem('name',this.userData.first_name);

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
      this.userData=res.data;
      //console.log(res.status);
    },
    (error) => {
      console.log(error.error)
    })
  }
  /* ______________________              ___________________
  __________________________ Delete User ____________________*/
  deleteUserProfile(){
    this._profile.deleteProfile(this.userData.id).subscribe((res)=>{
      if(res.status ==1 ){
        localStorage.clear();
        $(".btn-close").click();
        //$("#deleteAccount").modal('hide');
        this._Router.navigate(['/home']);
      }


  },
  (error) => {
    console.log(error.error)
  })
}

  ngOnInit(): void {
    $(".icon-drop").click(function () {
      $(".icon-drop .dropdown-menu").slideToggle(300);

    });
  }








}
