import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifiService } from '../../../services/notifi/notifi.service';
import { ApiService } from '../../../services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { config } from './../../../config';
@Component({
  selector: 'ngx-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {
  is_submit:any;
  productForm:FormGroup;
  img:any;
  imgURL:any;
  sellers:any=[];
  is_pic:any;
  type:any;
  logged_data:any;
  product_id:any;
  product_info:any;
  picUrl:any = config.API_URL+'/server/data/products/'
  pic:any;
  errors:any=['', null, undefined]
  constructor(
    public formBuilder: FormBuilder,
     private cd: ChangeDetectorRef,
     private router:Router,
     private noti:NotifiService,
     private api:ApiService,
     private spinner: NgxSpinnerService,
     public activated:ActivatedRoute) {
    this.product_id =this.activated.snapshot.paramMap.get('id');      
    this.type = Number(localStorage.getItem('admin'));
    this.logged_data = JSON.parse(localStorage.getItem('logged_data'));
 
    this.get_buyers();
    this.getSingleProduct();
   }

  makeform(){
    this.productForm= this.formBuilder.group({
      name:['',Validators.compose([Validators.required])],
      price:['',Validators.compose([Validators.required])],
      discount:[0,Validators.compose([])],
      discount_type:['1',Validators.compose([])],
      quantity:['',Validators.compose([Validators.required])],
      quantity_type:[null,Validators.compose([Validators.required])],
      category:['',Validators.compose([Validators.required])],
      in_stock:['',Validators.compose([Validators.required])],
      categories:['',Validators.compose([Validators.required])],
      description: ['',Validators.compose([Validators.required])]
    });
  }


  ngOnInit(): void {
       this.makeform();
  }

  addProduct(){
   this.is_submit = true;

   if(this.productForm.valid){
    console.log('1234')
      this.spinner.show();
      const formData = new FormData();
      if(this.is_pic){
        formData.append('file', this.img, this.img.name);
      }
      formData.append('name', this.productForm.value.name);
      formData.append('price', this.productForm.value.price);
      formData.append('discount', this.productForm.value.discount);
      formData.append('discount_type', this.productForm.value.discount_type);
      formData.append('quantity', this.productForm.value.quantity);
      formData.append('quantity_type', this.productForm.value.quantity_type);
      formData.append('category', this.productForm.value.category);
      formData.append('categories', this.productForm.value.categories);
      formData.append('in_stock', this.productForm.value.in_stock);
      formData.append('productId', this.product_id);
      formData.append('description', this.productForm.value.description);
      this.api.api('edit_product',formData).subscribe((result) => {
        this.spinner.hide();
        if(result.status==1){
           this.router.navigate(['/pages/product'])
          this.noti.success('Product has been updated.','Product Updated');
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

  getSingleProduct(){
    this.spinner.show();
    this.api.api('getSingleProduct',{_id: this.product_id}).subscribe((result) => {
      this.spinner.hide();
      if(result.status==1){
        this.productForm.patchValue(result.data)
        this.pic = result.data.image
      }else{

      }
      this.product_info = result;
      }, err => {
        this.spinner.hide();
       this.noti.error('Internal server error, Please try again later', 'Server error');
     });
  }



}
