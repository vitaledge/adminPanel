import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifiService } from '../../../services/notifi/notifi.service';
import { ApiService } from '../../../services/api/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'ngx-addextras',
  templateUrl: './addextras.component.html',
  styleUrls: ['./addextras.component.scss']
})
export class AddextrasComponent implements OnInit {
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
      description: ['',Validators.compose([Validators.required])],
      seller: ['',Validators.compose([Validators.required])],
      price:  ['',Validators.compose([Validators.required])]
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
        formData.append('description', this.productForm.value.description);
        formData.append('price', this.productForm.value.price);
        
        this.api.api('add_extras',formData).subscribe((result) => {
          this.spinner.hide();
          if(result.status==1){
         
           this.noti.success('New Extras has been updated.','New Extras');
           this.router.navigate(['/pages/extras'])
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

