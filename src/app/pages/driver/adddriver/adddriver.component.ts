import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifiService } from '../../../services/notifi/notifi.service';
import { ApiService } from '../../../services/api/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'ngx-adddriver',
  templateUrl: './adddriver.component.html',
  styleUrls: ['./adddriver.component.scss']
})
export class AdddriverComponent implements OnInit {
  is_submit:any;
  productForm:FormGroup;
  img:any;
  imgURL:any;
  sellers:any=[];
  is_pic:any=false;
  type:any;
  logged_data:any;
  address:any;
  isAddress:any=false;
  constructor(
    public formBuilder: FormBuilder,
     private cd: ChangeDetectorRef,
     private router:Router,
     private noti:NotifiService,
     private api:ApiService,
     private spinner: NgxSpinnerService) {
    this.is_pic = false
    this.type = Number(localStorage.getItem('admin'));
    this.logged_data = JSON.parse(localStorage.getItem('logged_data'));
    this.get_buyers()
   }

  makeform(){
    this.productForm= this.formBuilder.group({
      name:['',Validators.compose([Validators.required])],
      email:['', Validators.compose([Validators.required, Validators.email])],
      phone:['',Validators.compose([Validators.required])],
      password:['',Validators.compose([Validators.required])],
      city:['',Validators.compose([Validators.required])],
      state:['',Validators.compose([Validators.required])],
      pin:['',Validators.compose([Validators.required])],
      seller:['',Validators.compose([Validators.required])],
      associateSeller:[[]],
    });

    if(this.type==0){
      this.productForm.controls['seller'].setValue(this.logged_data._id);
     }
  }


  ngOnInit(): void {
       this.makeform();
  }


  addProduct(){
    this.is_submit = true;
    console.log(this.productForm.value)
    if(this.productForm.valid){

      console.log('valid')

      var assocs = []
      if(this.type==0){
        assocs.push(this.logged_data._id)
    
       }else{
        assocs = this.productForm.value.associateSeller;
        assocs.push(this.productForm.value.seller)
       }
    
     if(this.is_pic){
      console.log('valid1')

      if(this.isAddress){
        console.log('valid2')
       
        this.spinner.show();
        const formData = new FormData();
        formData.append('sellerId', this.productForm.value.seller);
        formData.append('file', this.img, this.img.name);
        formData.append('name', this.productForm.value.name);
        formData.append('email', this.productForm.value.email);
        formData.append('phone', this.productForm.value.phone);
        formData.append('password', this.productForm.value.password);
        formData.append('city', this.productForm.value.city);
        formData.append('state', this.productForm.value.state);
        formData.append('pin', this.productForm.value.pin);
        formData.append('lat', this.address.lat);
        formData.append('lng', this.address.lng);
        formData.append('address', this.address.address);
        formData.append('associateSeller', JSON.stringify(assocs));
    
        this.api.api('createDriver',formData).subscribe((result) => {
          this.spinner.hide();
          if(result.status==1){
         
           this.noti.success('New Driver has been updated.','New Driver');
           this.router.navigate(['/pages/driver'])
         }else if(result.status==2){
           
           this.noti.error('A Driver with same mobile number is already registered, Please use another number.','New Driver');
         }
         else if(result.status==5){
           
           this.noti.error('A Driver with same email is already registered, Please use another email.','New Driver');
         }
         else{
           this.noti.error('Something went wrong with creation.', 'Creation Failed');
         }
          }, err => {
            this.spinner.hide();
           this.noti.error('Internal server error, Please try again later', 'Server error');
         });

      }
 
      
  
 
     }else{
      
       this.is_pic = false;
  
     }
    }
 
   }
  
  autoCompleteCallback1(selectedData:any) {
  
    this.address = {
      address: selectedData.data.description,
      lng: selectedData.data.geometry.location.lng,
      lat:  selectedData.data.geometry.location.lat
    }

    this.isAddress =  true;

}


preview(files) {
  this.img = files[0];
  console.log('this.img', this.img)
   console.log('this.img', this.img.name)
  var reader = new FileReader();
  reader.readAsDataURL(files[0]); 
  reader.onload = (_event) => {
  this.is_pic = true;   
  this.imgURL = reader.result; 
  this.cd.markForCheck();
}
}

get_buyers(){
  this.spinner.show();
  this.api.api('getAllSellers','').subscribe((result) => {
    this.spinner.hide();
    this.sellers = result;
    }, err => {
      this.spinner.hide();
     this.noti.error('Internal server error, Please try again later', 'Server error');
   });
}

}

