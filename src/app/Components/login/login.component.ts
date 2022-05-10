import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import {AuthService} from '../../Services/auth.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage:any;
  constructor(private toastr: ToastrService,private _AuthService:AuthService,private _Router:Router) { }
  loginForm:FormGroup=new FormGroup({
    'email': new FormControl(null,[Validators.required,Validators.email]),
    'password': new FormControl(null,[Validators.required,Validators.minLength(6)]),
  });

  showSuccess(msg:any,title:any) {
    this.toastr.success(msg, title);
  }
  getlogin(){
    console.log(this.loginForm.value)
    this._AuthService.login(this.loginForm.value).subscribe((res)=>{
      if(res.status == 1){
        console.log(res.data);
        this.showSuccess('User login Successfully',"Login");
        this.loginForm.reset();
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('name',res.data.first_name)
        localStorage.setItem('id',res.data.id);
        console.log("name"+res.data.first_name);
        this._Router.navigate(['/home']);
      }
      else {
        this.errorMessage=res.message_error;
        console.log("response "+res.message_error);
      }

    },
    (error) => {
      this.errorMessage=error.error.message_error;
    })

  }

  changePassword(){
    $(".fa-lock").toggleClass('fa-unlock')
    if($('#pass').attr('type') == 'password')
      $('#pass').attr('type', 'text');
    else
    $('#pass').attr('type', 'password');
  }
  ngOnInit(): void {
  }

}
