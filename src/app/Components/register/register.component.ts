import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import {AuthService} from '../../Services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  erroreMessages:any;
  constructor(private toastr: ToastrService,private _AuthService:AuthService,private _Router:Router) { }

  registerForm:FormGroup=new FormGroup({
    'first_name': new FormControl(null,[Validators.required,Validators.minLength(3)]),
    'last_name': new FormControl(null,[Validators.required,Validators.minLength(3)]),
    'email': new FormControl(null,[Validators.required,Validators.email]),
    'password': new FormControl(null,[Validators.required,Validators.minLength(6)]),
    'confirm_password': new FormControl(null,[Validators.required,Validators.minLength(6)]),
    'mobile_phone': new FormControl(null,[Validators.required,Validators.minLength(11)]),
    'profile_image': new FormControl(null),
  });
  showSuccess(msg:any,title:any) {
    this.toastr.success(msg, title);
  }

ngOnInit(): void {

}
  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target?.files[0];
      this.registerForm.get('profile_image')?.setValue(file);

    }
  }


getRegistered() {
      const formData = new FormData();
      formData.append('profile_image', this.registerForm.get('profile_image')?.value);
      formData.append( "first_name", this.registerForm.get('first_name')?.value );
      formData.append( "last_name", this.registerForm.get('last_name')?.value );
      formData.append( "email", this.registerForm.get('email')?.value );
      formData.append( "mobile_phone", this.registerForm.get('mobile_phone')?.value  );
      formData.append( "password", this.registerForm.get('password')?.value  );
      formData.append( "confirm_password", this.registerForm.get('confirm_password')?.value  );
      this._AuthService.register(formData).subscribe((res)=>{
        console.log(res);
        console.log(res.status);
        this.showSuccess('User Added Successfully',"Registration");
        this.registerForm.reset();
        this._Router.navigate(['/login']);
      },
      (error) => {
        this.erroreMessages=error.error.message_error[0]
        console.log(this.erroreMessages)
        console.log(error.error)
      })

}

}
