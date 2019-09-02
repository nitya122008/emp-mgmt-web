import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmployeeDataComponent } from './employee-data/employee-data.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { MatPaginatorModule, MatTooltipModule, MatTableModule, MatDialogModule, MatExpansionModule, MatCardModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule, MatGridListModule, DateAdapter, MAT_DATE_LOCALE} from '@angular/material';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter'
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {BlockUIModule} from 'ng-block-ui';
import {BlockUIHttpModule} from 'ng-block-ui/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MAT_DATE_FORMATS } from '@angular/material';

export const DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};


@NgModule({
  declarations: [
    AppComponent,
    EmployeeDataComponent,
    EmployeeHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatGridListModule,
    HttpClientModule,
    MatMomentDateModule,
    BlockUIModule,
    BlockUIHttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      closeButton: true,
      tapToDismiss: false,
      timeOut: 10000,
      maxOpened: 1
    })
  ],
  exports: [
    CdkTableModule,
    CdkTreeModule
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
