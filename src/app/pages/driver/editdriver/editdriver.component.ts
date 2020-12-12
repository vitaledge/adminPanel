import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifiService } from '../../../services/notifi/notifi.service';
import { ApiService } from '../../../services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { config } from './../../../config';
@Component({
  selector: 'ngx-editdriver',
  templateUrl: './editdriver.component.html',
  styleUrls: ['./editdriver.component.scss']
})
export class EditdriverComponent implements OnInit {
  is_submit:any;
  productForm:FormGroup;
  img:any;
  imgURL:any;
  sellers:any=[];
  is_pic:any;
  type:any;
  logged_data:any;
  address:any;
  driver_id:any
  pic:any;
  errors:any=['', null, undefined]
  picUrl:any = config.API_URL+'/server/data/driver/';
  userSettings1:any={}
  seller_id:any;
  constructor(
    public formBuilder: FormBuilder,
     private cd: ChangeDetectorRef,
     private router:Router,
     private noti:NotifiService,
     private api:ApiService,
     private spinner: NgxSpinnerService,
     public activated:ActivatedRoute) {
    this.driver_id =this.activated.snapshot.paramMap.get('id');    
    this.type = Number(localStorage.getItem('admin'));
    this.logged_data = JSON.parse(localStorage.getItem('logged_data'));
    this.get_buyers()
    this.getSingleProduct();
 
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
      associateSeller:[[]],
    });
  }


  ngOnInit(): void {
       this.makeform();
  }


  addProduct(){

    this.is_submit = true;
 
    if(this.productForm.valid){
    
    
 
       this.spinner.show();
       const formData = new FormData();
       if(this.is_pic){
        formData.append('file', this.img, this.img.name);
       }

       var assocs = []
       if(this.type==0){
        assocs = this.productForm.value.associateSeller;
         assocs.push(this.logged_data._id)
     
        }else{
         assocs = this.productForm.value.associateSeller;
         assocs.push(this.seller_id)

        }
 
     
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
       formData.append('id', this.driver_id);
       formData.append('associateSeller', JSON.stringify(assocs));
       this.api.api('updateDriver',formData).subscribe((result) => {
         this.spinner.hide();
         if(result.status==1){
        
          this.noti.success('Driver has been updated.','Update');
          this.router.navigate(['/pages/driver'])
        }else if(result.status==2){
          
          this.noti.error('A Driver with same mobile number is already registered, Please use another number.','Update');
        }
        else if(result.status==5){
          
          this.noti.error('A Driver with same email is already registered, Please use another email.','Update');
        }
        else{
          this.noti.error('Something went wrong with creation.', 'Updation Failed');
        }
         }, err => {
           this.spinner.hide();
          this.noti.error('Internal server error, Please try again later', 'Server error');
        });
  

    }
 
   }
  
  autoCompleteCallback1(selectedData:any) {
  
    this.address = {
      address: selectedData.data.description,
      lng: selectedData.data.geometry.location.lng,
      lat:  selectedData.data.geometry.location.lat
    }
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

getSingleProduct(){
  this.spinner.show();
  this.api.api('getSingleDriver',{id: this.driver_id}).subscribe((result) => {
    this.spinner.hide();
    if(result.status==1){
      this.productForm.patchValue(result)
      this.pic = result.image;
      this.address = {
        address: result.address,
        lng:result.lng,
        lat:  result.lat
      }
      this.userSettings1['inputString'] = result.address ;
      this.userSettings1 = Object.assign({},this.userSettings1);
      this.productForm.controls['associateSeller'].setValue(result.associateSeller);
      this.seller_id = result.sellerId
    }else{

    }
 
    }, err => {
      this.spinner.hide();
     this.noti.error('Internal server error, Please try again later', 'Server error');
   });
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


