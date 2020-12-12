import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifiService {

  constructor(private toastr: ToastrService) { }

 
  success(title, msg) {
    this.toastr.success(title, msg);
  }

  warning(title, msg) {
    this.toastr.warning(title, msg);
  }

  error(title, msg) {
    this.toastr.error(title, msg);
  }

  show(title, msg) {
    this.toastr.show(title, msg);
  }
}
