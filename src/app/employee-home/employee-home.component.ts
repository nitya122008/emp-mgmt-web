import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { HttpClient } from "@angular/common/http";
import alert from 'sweetalert2';
export interface Employee{
  employeeId : number;
  firstName : string;
  lastName : string;
  hireDate : String;
  role : String;
}

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {

  ngOnInit(): void {

  }

  displayedColumns = ['employeeId','firstName','lastName','hireDate','role', 'quote', 'extra', 'action'];
  employees = [];

  constructor(
    private router: Router,
    private toastr : ToastrService,
    private http : HttpClient
  ) {}

  searchAll() {
    this.http.get('/api/employees').subscribe((data:any) => {
      let allEmployes = data['employees'];

      this.employees = Object.values(allEmployes);
    });
 
  }

  deleteEmployee(empId) {
    alert.fire({
      titleText: 'Delete Employee Record Confirmation',
      text: 'Are you sure you want to delete this employee record?',
      type: 'warning',
      showCancelButton: true,
      animation: false
    }).then((res) => {
        if(res.value) {
          this.http.delete('/api/employees/'+empId).subscribe((data:any) =>{
            this.searchAll();
          })
        }
    }
    );
  
    

  }

}
