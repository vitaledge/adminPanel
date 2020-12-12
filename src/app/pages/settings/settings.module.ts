import {
  NbActionsModule,
  NbButtonModule,
 
  NbCheckboxModule,
  NbDatepickerModule, 
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import {MatTableModule} from '@angular/material/table';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner"
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
 
import { RouterModule } from '@angular/router';


@NgModule({ 
  declarations: [SettingsComponent],
  imports: [
    Ng4GeoautocompleteModule.forRoot(),
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NbActionsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDatepickerModule, 
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    CommonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
    ThemeModule,
    RouterModule
  ]
})
export class SettingsModule { }
