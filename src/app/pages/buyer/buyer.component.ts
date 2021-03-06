import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { NotifiService } from '../../services/notifi/notifi.service';
import { ApiService } from '../../services/api/api.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  
  settings = {
    add: {
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      phone: {
        title: 'Phone',
        type: 'string',
      },
      password: {
        title: 'Password',
        type: 'string',
        editable: false,
      },
      orders: {
        title: 'Orders',
        type: 'string',
        editable: false,
        addable: false,
        defaultValue: "0"
      }
    
    },
  };
  errors:any = [''," ", null, undefined];

  constructor(
    private service: SmartTableData,
    private router:Router,
    private noti:NotifiService,
    private api:ApiService,
    private spinner: NgxSpinnerService) { 
      this.get_buyers();
 
    }

  ngOnInit(): void {
  }



  add(){
    this.router.navigate(['/pages/addbuyer'])
  }

  get_buyers(){
     
    this.api.api('getAllUsers','').subscribe((result) => {
       
       this.source.load(result);

      }, err => {
          
       this.noti.error('Internal server error, Please try again later', 'Server error');
     });
  }

  onAddRecord(event){
    if(this.errors.indexOf(event.newData.name)>=0){
      this.noti.error('Name field should not be empty', 'Error');
    }else if(this.errors.indexOf(event.newData.phone)>=0){
      this.noti.error('Phone field should not be empty', 'Error');
    }
    else if(this.errors.indexOf(event.newData.email)>=0){
      this.noti.error('Please Enter a valid Email', 'Error');
    }
    else if(this.errors.indexOf(event.newData.password)>=0){
      this.noti.error('Password field should not be empty', 'Error');
    }
    else{
      var data = {
        name: event.newData.name,
        phone: event.newData.phone,
        email: event.newData.email,
        password :  event.newData.password,
        country_code : '+91',
       }
  
       this.spinner.show();  
     
        this.api.api('register', data).subscribe((result) => {
          this.spinner.hide();  
        if(result.status==1){
          event.confirm.resolve();
          this.noti.success('New Buyer has been created.','New Buyer');
        }else if(result.status==2){
          
          this.noti.error('A Buyer with same mobile number is already registered, Please use another number.','New Buyer');
        } else if(result.status==5){
          
          this.noti.error('A Buyer with same email is already registered, Please use another email.','New Buyer');
        }
        else{
          this.noti.error('Something went wrong with creation.', 'Creation Failed');
        }
    
         }, err => {
          this.spinner.hide();  
          this.noti.error('Unable to fetch chat, Please try again', 'Server Error');
        });

      
    }
    

  }

  onUpdateRecord(event){  
if(this.errors.indexOf(event.newData.name)>=0){
  this.noti.error('Name field should not be empty', 'Error');
}else if(this.errors.indexOf(event.newData.phone)>=0){
  this.noti.error('Phone field should not be empty', 'Error');
}
else if(this.errors.indexOf(event.newData.email)>=0){
  this.noti.error('Please Enter a valid Email', 'Error');
}
else{
 
  var data = {
    id: event.newData._id,
    name: event.newData.name,
    phone: event.newData.phone,
    email: event.newData.email,
    status: event.newData.status,
    image: event.newData.image,
   }
   this.spinner.show();  
 
    this.api.api('editUser', data).subscribe((result) => {
      this.spinner.hide();  
    if(result.status==1){
      event.confirm.resolve();
      this.noti.success('The data of user has been updated.','User Updated');
    }else if(result.status==2){
    
      this.noti.error('A Buyer with same mobile number is already registered, Please use another number.','Update Buyer');
    }else if(result.status==5){
          
      this.noti.error('A Buyer with same email is already registered, Please use another email.','New Buyer');
    }else{
      this.noti.error('Something went wrong with updation.', 'Update Failed');
    }

     }, err => {
      this.spinner.hide();  
      this.noti.error('Unable to fetch chat, Please try again', 'Server Error');
    });
}
  
 

  
  }

  ValidateEmail(mail) 
{
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 if (filter.test(mail))
  {
    return false
  }else{
    return true
  }
   
}

  onDeleteConfirm(event): void {
    this.spinner.show();  
    this.api.api('deleteUser', {id:event.data._id }).subscribe((result) => {
      this.spinner.hide();  
      if(result.status==1){
        event.confirm.resolve();
        this.noti.success('All the data of user has been deleted.','User Deleted');
      }else{
        this.noti.error('Something went wrong with deletion.', 'Delete Failed');
      }
  
       }, err => {
        this.spinner.hide();  
        this.noti.error('Unable to fetch chat, Please try again', 'Server Error');
      });

    // if (window.confirm('Are you sure you want to delete?')) {
    //   event.confirm.resolve();
    // } else {
    //   event.confirm.reject();
    // }
  }


}
