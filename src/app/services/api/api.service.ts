import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import * as CryptoJS from 'crypto-js';
import 'rxjs/add/operator/catch';
import { config } from '../../config';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:any=config.API_URL+'/';
  constructor(private http: Http) { }

  api(endpoint,data){

    return this.http.post(this.url+endpoint , data).map((responseData) => {
        return responseData.json();
    }, error => {
     	return error.json();
  	});
  }

  encryptData(data,salt) {
	    try {
	        var enc = CryptoJS.AES.encrypt(JSON.stringify(data), salt).toString();
	        enc = enc.split('+').join('xMl3Jk').split('/').join('Por21Ld').split('=').join('Ml32');
	        return enc;
	    } catch (e) {
	        return 0;
	    }
	}

	decryptData(data,salt) {
	    try { 
	        data = data.split('xMl3Jk').join('+').split('Por21Ld').join('/').split('Ml32').join('=');
	        const bytes = CryptoJS.AES.decrypt(data, salt);
	        if (bytes.toString()) {
	            var dec = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	            return dec;
	        }
	        return data;
	    } catch (e) {
	        return 0;
	    }
	}
}
