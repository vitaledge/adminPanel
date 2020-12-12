import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
     <b>Designed and implemented by <a href="http://vitaledge.co.za" target="_blank">Vital Edge </a></b> Copyright © 2020
    </span>

  `,
})
export class FooterComponent {
}
