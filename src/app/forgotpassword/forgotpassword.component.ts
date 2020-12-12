import { Component, OnInit, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotifiService } from '../services/notifi/notifi.service';
import { ApiService } from '../services/api/api.service';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { EventsService } from '../services/events/events.service';
@Component({
  selector: 'ngx-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss', './admin.css','./bootstrap.min.css','./chosen.css','./uikit.addons.min.css','./uikit.almost-flat.min.css']
})
export class ForgotpasswordComponent implements OnInit {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  loginForm: FormGroup;
  resetForm: FormGroup;
  submitted:any;
  is_submit:any;
  otp_came:any=false;
  is_submit_1:any;
  not_match:any;
  constructor(
          private api:ApiService,
          private spinner: NgxSpinnerService,
          public router: Router, 
          public FormBuilder:FormBuilder,
          private noti:NotifiService,
          public events:EventsService
        ){

    this.loginForm = this.FormBuilder.group({
      email: ['', Validators.compose([Validators.required])]
    });

    this.resetForm = this.FormBuilder.group({
      otp: ['', Validators.compose([Validators.required])],
      newpassword: ['', Validators.compose([Validators.required])],
      confirmpassword: ['', Validators.compose([Validators.required])],
    });
  
  }

  ngOnInit(): void {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
  }

  submit(){
    
    this.is_submit = true;
      if(this.loginForm.valid){
    
      this.spinner.show();
      this.api.api('forgotAccount',{email:this.loginForm.value.email}).subscribe((result) => { 
      this.spinner.hide();              
      var response;  
      response = result; 
      if( response.status == 1){
           this.otp_came= true;
      }
      else if(response.status == 5){
        this.noti.error('Error', 'No account exists for this email')
      }      
      else{
        this.noti.error('Error', 'Error in sending OTP')
      }
  
      this.spinner.hide();

  
      },
      err => {
      this.spinner.hide();   
      });
    }

  }

  resetPassword(){

    this.is_submit_1 =true;
    if(this.resetForm.valid){
      if(this.resetForm.value.newpassword == this.resetForm.value.confirmpassword){
        this.not_match = false
        var data = {
          otp: this.resetForm.value.otp,
          password: this.resetForm.value.newpassword,
          email: this.loginForm.value.email
        }
    
      this.spinner.show();
      this.api.api('resetpassword', data).subscribe((result) => { 
      this.spinner.hide();              
      var response;  
      response = result; 
      if( response.status == 1){
        this.noti.success('Your password has been changed, login with new password', 'Success')
        this.router.navigate(['/signin'])
      }
      else{
        this.noti.error(response.msg, 'Error')
      }
  
      this.spinner.hide();
  
  
      },
      err => {
      this.spinner.hide();   
      });
      }else{
        this.not_match = true

      }
     
  }
  }

}

