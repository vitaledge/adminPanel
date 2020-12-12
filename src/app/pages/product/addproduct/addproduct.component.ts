import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifiService } from '../../../services/notifi/notifi.service';
import { ApiService } from '../../../services/api/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'ngx-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  is_submit:any;
  productForm:FormGroup;
  img:any;
  imgURL:any;
  sellers:any=[];
  is_pic:any;
  type:any;
  logged_data:any;
  forms : any= []
  errors : any= ['', null, undefined]
  name: any;
  price: any;
  discount:any;
  discount_type: any;
  quantity: any;
  quantity_type: any;
  category: any;
  in_stock: any;
  categories: any;
  description: any;

  constructor(
    public formBuilder: FormBuilder,
     private cd: ChangeDetectorRef,
     private router:Router,
     private noti:NotifiService,
     private api:ApiService,
     private spinner: NgxSpinnerService,
     private domSanitizer: DomSanitizer) {
    this.type = Number(localStorage.getItem('admin'));
    this.logged_data = JSON.parse(localStorage.getItem('logged_data'));
 
    this.get_buyers()
   }

  makeform(){


    this.forms.push({
      pic:'',
      seller: '',
      name: '',
      price: '',
      discount:'0',
      discount_type: '1',
      quantity:'',
      quantity_type: '',
      category: '',
      in_stock: '',
      categories: '',
      description: '',
      imgURL:''
    })

  }


  ngOnInit(): void {
       this.makeform();
  }

  addProduct(){
    this.is_submit = true;
    if(this.validation()){
      var i = 0
      for(let key of this.forms){

        const formData = new FormData();
        formData.append('storeId', this.type==1 ? key.seller : this.logged_data._id);
        formData.append('file', key.pic, key.pic.name);
        formData.append('name', key.name);
        formData.append('price', key.price);
        formData.append('discount', key.discount);
        formData.append('discount_type', key.discount_type);
        formData.append('quantity', this.errors.indexOf(key.quantity)==-1 ? key.quantity : 1);
        formData.append('quantity_type', this.errors.indexOf(key.quantity_type)==-1 ? key.quantity_type : 1);
        formData.append('category', key.category);
        formData.append('in_stock', key.in_stock);
        formData.append('categories', key.categories);
        formData.append('description', key.description);

        this.api.api('add_product', formData).subscribe((result) => {
          this.spinner.hide();
          if(result.status==1){
             i++
            if(i==this.forms.length){
              this.noti.success('Data has been saved.','Success');
              this.router.navigate(['/pages/product'])
            }
         }
         else{
           this.noti.error('Something went wrong with creation.', 'Creation Failed');
         }
          }, err => {
            this.spinner.hide();
           this.noti.error('Internal server error, Please try again later', 'Server error');
         });


      }
    }
   

 
  }

  validation(){
    var i = 0;
    for(let key of this.forms){
     var isValid = true;
     

      if(this.errors.indexOf(key.seller)>=0){
        if(this.type==1){
          this.noti.error('Please recheck form, seller field is required', 'Form not valid');
          isValid = false
          return false;
        }
      }
      if(this.errors.indexOf(key.name)>=0){
        this.noti.error('Please recheck form, name field is required', 'Form not valid');
        isValid = false
        return false;
        
      }

      if(this.errors.indexOf(key.description)>=0){
        this.noti.error('Please recheck form, description field is required', 'Form not valid');
        isValid = false
        return false;
        
      }

      if(this.errors.indexOf(key.price)>=0){
        this.noti.error('Please recheck form, price field is required', 'Form not valid');
        isValid = false
        return false;
        
      }

 

      if(this.errors.indexOf(key.category)>=0){
        this.noti.error('Please recheck form, Veg/Non-veg field is required', 'Form not valid');
        isValid = false
        return false;
        
      }

      if(this.errors.indexOf(key.categories)>=0){
        this.noti.error('Please recheck form, categories field is required', 'Form not valid');
        isValid = false
        return false;
        
      }

      if(this.errors.indexOf(key.in_stock)>=0){
        this.noti.error('Please recheck form, stock field is required', 'Form not valid');
        isValid = false
        return false;
        
      }


      if(this.errors.indexOf(key.pic)>=0){
        this.noti.error('Please recheck form, picture field is required', 'Form not valid');
        isValid = false
        return false;
        
      }

      i++;

      if(i==this.forms.length && isValid){
        return true;
      }

    }
  }

  addMore(){
    this.is_submit = false
    this.forms.push({
      pic: '',
      seller: '',
      name: '',
      price: '',
      discount:'0',
      discount_type: '1',
      quantity: '',
      quantity_type: '',
      category: '',
      in_stock: '',
      categories: '',
      description: '',
      imgURL:''
    })
  }

  preview(files, i) {

    this.img = files[0];
    this.forms[i].pic = this.img;
    console.log('this.img', this.img)
     console.log('this.img', this.img.name)
    var reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => {
    this.is_pic = true; 
    this.forms[i].imgURL =  reader.result 
    this.imgURL = reader.result; 
    this.cd.markForCheck();
  }
  }

  photoURL(src) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(src);
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
