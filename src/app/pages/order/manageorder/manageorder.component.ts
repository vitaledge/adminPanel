import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifiService } from '../../../services/notifi/notifi.service';
import { ApiService } from '../../../services/api/api.service';
 
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-manageorder',
  templateUrl: './manageorder.component.html',
  styleUrls: ['./manageorder.component.scss']
})
export class ManageorderComponent implements OnInit {
  is_submit:any;
  productForm:FormGroup;
  img:any;
  imgURL:any;
  sellers:any=[];
  is_pic:any;
  type:any;
  logged_data:any;
  address:any;
  orderId:any;
  orderDetails:any;
  userDetails:any;
  allDrivers:any;
  driverId:any;
  status:any;
  isDriver:any;
  driverDetails:any;
  statusName:any;
  extras:any=[]
  cancel:any=false;
  sellerId:any;
  constructor(
    public formBuilder: FormBuilder,
     private cd: ChangeDetectorRef,
     private router:Router,
     private noti:NotifiService,
     private api:ApiService,
     private spinner: NgxSpinnerService,
     public activated:ActivatedRoute) {
      this.orderId = this.activated.snapshot.paramMap.get('id');  
      this.type = Number(localStorage.getItem('admin'));
      this.logged_data = JSON.parse(localStorage.getItem('logged_data'));
      this.spinner.show();
      this.getOrder();
      this.get_products();
   }

  makeform(){
    this.productForm = this.formBuilder.group({
      statusOrder:['',Validators.compose([Validators.required])],
      driverAssign:['', Validators.compose([Validators.required])],
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
 
    if(this.productForm.valid){
    
     if(this.is_pic){
 
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

    this.is_pic =  true;

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

getOrder(){
     
  this.api.api('getOrderDetails',{id: this.orderId}).subscribe((result) => {
  this.spinner.hide();
  this.extras = result.extrasInfo;
  this.orderDetails = result.order;
  this.userDetails = result.usersinfo;
  this.status =  result.order.delivery_status;
  this.sellerId  = result.order.sellerId
  this.productForm.patchValue({
    statusOrder: this.status,
    driverAssign: result.order.driverId
  })
  if(this.status==1){
    this.statusName = 'Delivered'
  }else if(this.status==2){
    this.statusName = 'Being Processed'
  }else if(this.status==3){
    this.statusName = 'On its way'
  }else if(this.status==4){
    this.statusName = 'Canelled'
  }
  else if(this.status==5){
    this.statusName = 'Arrived'
  }
  else if(this.status==6){
    this.statusName = 'Accepted'
  }
  else if(this.status==7){
    this.statusName = 'Rejected'
  }
  else if(this.status==0){
    this.statusName = 'Pending'
  }
  this.driverId =  result.order.driverId;
  this.driverDetails = result.driverInfo;
  console.log('result.order.driverId', result.order.driverId)
  this.isDriver = result.order.driverId == 0 ? false : true

    }, err => {
    this.spinner.hide();     
     this.noti.error('Internal server error, Please try again later', 'Server error');
   });
}

get_products(){
     
  this.api.api('getAllDrivers',{type: this.type, id: this.logged_data._id}).subscribe((result) => {
  this.spinner.hide();
   console.log(result);
   this.allDrivers = result ; 

    }, err => {
    this.spinner.hide();     
     this.noti.error('Internal server error, Please try again later', 'Server error');
   });
}

updateOrder(){
  this.is_submit = true;
  if(this.productForm.valid){

    this.api.api('updateOrder',{driverId: this.productForm.value.driverAssign, orderId: this.orderId, status: this.productForm.value.statusOrder, sellerId: this.sellerId}).subscribe((result) => {
      this.spinner.hide();
      var res;
      res = result;
      if(res.status==1){
        this.isDriver =  true;
        this.getOrder();
        this.noti.success('Order status has been updated successfully', 'Updated Successfully');
      }else{
        this.noti.error('Internal server error, Please try again later', 'Server error');
      }
    }, err => {
    this.spinner.hide();     
     this.noti.error('Internal server error, Please try again later', 'Server error');
   });

  }

}

onOptionsSelected(event){
 if(event==4 || event==7 || event==6){

    this.cancel =  true;
    this.productForm.controls['driverAssign'].setValue('0');

 }else{
  this.productForm.controls['driverAssign'].setValue(null);
    this.cancel =  false;

 }

}

}


