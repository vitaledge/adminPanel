import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifiService } from '../../services/notifi/notifi.service';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { config } from './../../config';
import { EventsService } from '../..//services/events/events.service';
@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  is_submit:any;
  productForm:FormGroup;
  img:any;
  imgURL:any;
  sellers:any=[];
  is_pic:any;
  profile:any;
  type:any;
  _id:any;
  url:any=  config.API_URL+'/server/data/seller/'
  errors:any= ['', null, undefined]
  address:any;
  userSettings1:any={}
  isAddress:any;
  constructor(
    public formBuilder: FormBuilder,
     private cd: ChangeDetectorRef,
     private router:Router,
     private noti:NotifiService,
     private api:ApiService,
     private spinner: NgxSpinnerService,
     public events:EventsService) {
      this.makeform()
      var profile_data = localStorage.getItem('logged_data');
      this.type = Number(localStorage.getItem('admin'));
      this.profile = JSON.parse(profile_data);
      this._id = this.profile._id
      this.productForm.patchValue(this.profile);

      this.userSettings1['inputString'] = this.profile.address ;
      this.userSettings1 = Object.assign({}, this.userSettings1);

      this.isAddress =  true;

      this.address = {
        address: this.profile.address,
        lng: this.profile.lng,
        lat: this.profile.lat
      }

   }

  makeform(){
    this.productForm= this.formBuilder.group({
      store_name: ['',Validators.compose([Validators.required])],
      phone: ['',Validators.compose([Validators.required])],
      email:  ['',Validators.compose([Validators.required])],
      address:['',Validators.compose([Validators.required])],
      city: ['',Validators.compose([Validators.required])],
      state: ['',Validators.compose([Validators.required])],
      pin: ['',Validators.compose([Validators.required])],
      accountCode: ['',Validators.compose([Validators.required])],
      accountKey: ['',Validators.compose([Validators.required])],
    });
  }


  ngOnInit(): void {
   
  }

  addProduct(){
 
   this.is_submit = true;

   if(this.productForm.valid){

    if(this.isAddress){

    }else{
      this.isAddress = false;
    }

      this.spinner.show();
      const formData = new FormData();
      if(this.is_pic){
        formData.append('file', this.img, this.img.name);
      }
      formData.append('_id', this.profile._id);
      formData.append('store_name', this.productForm.value.store_name);
      formData.append('phone', this.productForm.value.phone);
      formData.append('email', this.productForm.value.email);
      formData.append('state', this.productForm.value.state);
      formData.append('pin', this.productForm.value.pin);
      formData.append('city', this.productForm.value.city);
      formData.append('address', this.address.address);
      formData.append('lat', this.address.lat);
      formData.append('lng', this.address.lng);
      formData.append('accountCode', this.productForm.value.accountCode);
      formData.append('accountKey', this.productForm.value.accountKey);

      this.api.api('updateSellerAccount',formData).subscribe((result) => {
        this.spinner.hide();
        if(result.status==1){
          localStorage.setItem('logged_data',JSON.stringify(result.data) );
          this.events.changeMessage("")
          this.noti.success('Your data has been updated.', 'Updated Successfully');
        }else{
          this.noti.error('Something went wrong with creation.', 'Updation Failed');
        }
        }, err => {
          this.spinner.hide();
         this.noti.error('Internal server error, Please try again later', 'Server error');
       });

   }

  }

  preview(files) {
    this.img = files[0];
    var reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => {
    this.is_pic = true;   
    this.imgURL = reader.result; 
    this.cd.markForCheck();
  }
  }

  autoCompleteCallback1(selectedData:any) {
  
    this.address = {
      address: selectedData.data.description,
      lng: selectedData.data.geometry.location.lng,
      lat:  selectedData.data.geometry.location.lat
    }
    
  }


}
