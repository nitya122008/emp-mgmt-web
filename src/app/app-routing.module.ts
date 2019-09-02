import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDataComponent } from './employee-data/employee-data.component';
import { ExternalResolveService } from './external-resolver.service';
import { EmployeeResolverService } from './employee-resolver.service';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeeHomeComponent
  },
  {
    path: "entry",
    component: EmployeeDataComponent, resolve: {
      employee : EmployeeResolverService,
      externalRes : ExternalResolveService
    }
  },
  {
    path: "entry/:empId",
    component: EmployeeDataComponent, resolve: {
      employee : EmployeeResolverService,
      externalRes : ExternalResolveService
    }  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
