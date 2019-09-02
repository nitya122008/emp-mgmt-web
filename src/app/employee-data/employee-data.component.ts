import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeInfo } from '../model/employeeInfo';
import { HireDateValidator } from '../employee-hire-date-validator';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.css']
})
export class EmployeeDataComponent implements OnInit {

  employeeEntryForm: FormGroup;
  quote = {};
  joke = '';
  editEmp = false;
  addEmp = true;
  roles = ['CEO','VP','MANAGER','LACKEY'];
  submitted = false;
  serviceErrors:any = {};
  maxDate = moment().subtract(1, 'days');
  uuid : string;
  editedEmpId = '';

  constructor(
    private router : Router,
    private formBuilder : FormBuilder,
    private toastr : ToastrService,
    private route : ActivatedRoute,
    private hireDateValidator : HireDateValidator,
    private http : HttpClient
  ) { 
    this.http.get('/api/generate_uuid').subscribe((data:any) => {
      this.uuid = data.uuid;
    }, error => {
        console.log("There was an error generating the proper UUID on the server", error);
    });
  }

  ngOnInit() {
    this.toastr.clear()
    let data = this.route.snapshot.data['externalRes'];
    let empId = this.route.snapshot.params['empId'];
    let editedEmployee  = new EmployeeInfo();
    if(this.route.snapshot.data['employee']) {
      editedEmployee = new EmployeeInfo(this.route.snapshot.data['employee'].employee);
    }
    if(empId) {
      this.editedEmpId = empId;
    }

    if(data) {
      data.joke.subscribe((data: any) => {this.joke = data;});
      data.quote.subscribe((data: any) => {this.quote = data;});
    }

    console.log('quote', this.quote);
    this.employeeEntryForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
  		lastName: ['', [Validators.required, Validators.maxLength(50)]],
      hireDate: ['', [Validators.required, this.hireDateValidator.validateHireDate]],
      role: ['', [Validators.required]],
      employeeId: ['']
    })

    if(editedEmployee && editedEmployee.employeeId) {
      this.editEmp = true;
      this.addEmp = false;
      this.employeeEntryForm.patchValue({
        firstName : editedEmployee.firstName,
        lastName : editedEmployee.lastName,
        hireDate : editedEmployee.hireDate,
        role : editedEmployee.role

      }
        
      );
    } else {
      this.editEmp = false;
      this.addEmp = true;
    }
  }

  cancel() {
    this.router.navigate(['']);
  }

  onSubmit(employeeData) {
      this.submitted = true;
      this.toastr.clear();
      let quote = '';
  
      if(this.quote && this.quote['quote'] && this.quote['quote'][0]) {
        quote = this.quote['quote'][0];
      }
      if(this.employeeEntryForm.invalid == true)
      {
        return;
      }
      else
      {
        var hireDate = moment(employeeData.hireDate).format('YYYY-MM-DD');
        employeeData.hireDate = hireDate;
        let data: any = Object.assign({uuid: this.uuid}, employeeData);
        if(this.editEmp) {
          data.employeeId = this.editedEmpId;
          this.http.put('/api/employees/'+data.employeeId, data).subscribe((data:any) => {
            this.toastr.success('Employee record updated successfully')
          }, error =>
          {
            this.serviceErrors = error.error.error;
            });
        } else {
          data.quote = quote;
          this.http.post('/api/employees', data).subscribe((data:any) => {
          
            this.toastr.success(null,'Employee record added successfully');

            this.router.navigate(['']);

          }, error =>
          {
            this.serviceErrors = error.error.error;
            });
    
        }
      }
    }
  
  
  
  invalidFirstName()
  {
  	return (this.submitted && (this.serviceErrors.first_name != null || this.employeeEntryForm.controls.firstName.errors != null));
  }

  invalidLastName()
  {
  	return (this.submitted && (this.serviceErrors.last_name != null || this.employeeEntryForm.controls.lastName.errors != null));
  }

  invalidRole()
  {
  	return (this.submitted && (this.serviceErrors.email != null || this.employeeEntryForm.controls.role.errors != null));
  }

  invalidHireDate()
  {
  	return (this.submitted && (this.serviceErrors.zipcode != null || this.employeeEntryForm.controls.hireDate.errors != null));
  }


  populateEmployeeForm(employee) {
    let hireDate = new Date(employee.hireDate);
    this.employeeEntryForm.patchValue({
      firstName : employee.firstName,
      lastName : employee.lastName,
      hireDate,
      role : employee.role
    })
  }

  get f(): any {return this.employeeEntryForm.controls;}

}
