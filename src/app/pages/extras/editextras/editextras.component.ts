import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifiService } from '../../../services/notifi/notifi.service';
import { ApiService } from '../../../services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { config } from './../../../config';
@Component({
  selector: 'ngx-editextras',
  templateUrl: './editextras.component.html',
  styleUrls: ['./editextras.component.scss']
})
export class EditextrasComponent implements OnInit {
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
  picUrl:any = config.API_URL+'/server/data/extras/';
  userSettings1:any={}
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
    this.getSingleProduct();
   }

  makeform(){
    this.productForm= this.formBuilder.group({
      name:['',Validators.compose([Validators.required])],
      description: ['',Validators.compose([Validators.required])],
      sellerId: ['',Validators.compose([Validators.required])],
      price:  ['',Validators.compose([Validators.required])]
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
       formData.append('ExtrasId', this.driver_id);
        formData.append('name', this.productForm.value.name);
        formData.append('description', this.productForm.value.description);
        formData.append('price', this.productForm.value.price);


       this.api.api('edit_extras',formData).subscribe((result) => {
         this.spinner.hide();
         if(result.status==1){
        
          this.noti.success('Extras has been updated.','Update');
          this.router.navigate(['/pages/extras'])
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
  this.api.api('getSingleExtras',{_id: this.driver_id}).subscribe((result) => {
    this.spinner.hide();
    if(result.status==1){
      this.productForm.patchValue(result.data)
      this.pic = result.data.image;
 
    }else{

    }
 
    }, err => {
      this.spinner.hide();
     this.noti.error('Internal server error, Please try again later', 'Server error');
   });
}

}


