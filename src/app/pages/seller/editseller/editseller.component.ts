import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifiService } from '../../../services/notifi/notifi.service';
import { ApiService } from '../../../services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'ngx-editseller',
  templateUrl: './editseller.component.html',
  styleUrls: ['./editseller.component.scss']
})
export class EditsellerComponent implements OnInit {
  is_submit:any;
  productForm:FormGroup;
  img:any;
  imgURL:any;
  sellers:any=[];
  is_pic:any;
  type:any;
  logged_data:any;
  address:any;
  seller_id:any
  userSettings1:any={}
  constructor(
    public formBuilder: FormBuilder,
     private cd: ChangeDetectorRef,
     private router:Router,
     private noti:NotifiService,
     private api:ApiService,
     public activated:ActivatedRoute,
     private spinner: NgxSpinnerService) {
    this.type = Number(localStorage.getItem('admin'));
    this.logged_data = JSON.parse(localStorage.getItem('logged_data'));
    this.seller_id = this.activated.snapshot.paramMap.get('id'); 
    this.getSingleSeller()
   }

  makeform(){
    this.productForm= this.formBuilder.group({
      store_name:['',Validators.compose([Validators.required])],
      email:['', Validators.compose([Validators.required, Validators.email])],
      phone:['',Validators.compose([Validators.required])],
      // password:['',Validators.compose([Validators.required])],
      city:['',Validators.compose([Validators.required])],
      state:['',Validators.compose([Validators.required])],
      pin:['',Validators.compose([Validators.required])],
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
    this.spinner.show();
   
    if(this.is_pic){

      var data = {
        driver_name: null,
        store_name: this.productForm.value.store_name,
        phone: this.productForm.value.phone,
        email: this.productForm.value.email,
        country_code: '+91',
        address: this.address.address,
        city: this.productForm.value.city,
        state: this.productForm.value.state,
        pin: this.productForm.value.pin,
        // password: this.productForm.value.password,
        image: null,
        lat: this.address.lat,
        lng: this.address.lng,
        storeId: this.seller_id
       }

      this.api.api('updateSellerInfo', data).subscribe((result) => {
        this.spinner.hide();
        if(result.status==1){
        
          this.noti.success('New Seller has been updated.','New Seller');
          this.router.navigate(['/pages/seller'])
        }else if(result.status==2){
          
          this.noti.error('A Seller with same mobile number is already registered, Please use another number.','New Seller');
        }
        else if(result.status==5){
          
          this.noti.error('A Seller with same email is already registered, Please use another email.','New Seller');
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

getSingleSeller(){
  this.spinner.show();
  this.api.api('getSingleSeller',{id: this.seller_id}).subscribe((result) => {
    this.spinner.hide();
    this.productForm.patchValue(result)
    this.userSettings1['inputString'] = result.address ;
    this.userSettings1 = Object.assign({},this.userSettings1);
    this.is_pic =  true;
    this.address = {
      address: result.address,
      lng: result.address.lng,
      lat: result.address.lat
    }
 
    }, err => {
      this.spinner.hide();
     this.noti.error('Internal server error, Please try again later', 'Server error');
   });
}


}

