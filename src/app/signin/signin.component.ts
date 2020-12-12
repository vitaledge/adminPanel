import { Component, OnInit, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotifiService } from '../services/notifi/notifi.service';
import { ApiService } from '../services/api/api.service';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { EventsService } from '../services/events/events.service';
@Component({
  selector: 'ngx-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss','./admin.css','./bootstrap.min.css','./chosen.css','./uikit.addons.min.css','./uikit.almost-flat.min.css']
})
export class SigninComponent implements OnInit {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  loginForm: FormGroup;
  submitted:any;
  is_submit:any;
  constructor(
          private api:ApiService,
          private spinner: NgxSpinnerService,
          public router: Router, 
          public FormBuilder:FormBuilder,
          private noti:NotifiService,
          public events:EventsService
        ){

    this.loginForm = this.FormBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
  
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
      this.api.api('loginSeller',{email:this.loginForm.value.email,password:this.loginForm.value.password}).subscribe((result) => {               
      console.log(result);
      var response;  
      response = result; 
      if( response.status == 1){
    
        if(response.data.not_admin == '0'){
          localStorage.setItem('admin','1');
        }else{
          localStorage.setItem('admin','0');
        }

      this.messageSource.next('12345')

      this.events.changeMessage("Hello from Sibling")
       
      localStorage.setItem('logged_data',JSON.stringify(response.data));
      this.router.navigate(['/pages/iot-dashboard']);      
      }
      else{
        this.noti.error('Provided credentials are wrong','Login failed')
      }
  
      this.spinner.hide();

  
      },
      err => {
      this.spinner.hide();   
      });
    }

  }

}
