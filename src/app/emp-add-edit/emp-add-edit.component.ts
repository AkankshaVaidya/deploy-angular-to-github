import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  
  education :string[] = [
    'Matrics',
    'Intermediate',
    'Diploma',
    'Graduate',
    'Post Graduate',
  ];

 constructor(private _fb: FormBuilder , 
             private _empservice:EmployeeService ,
             private _dialogRef: MatDialogRef<EmpAddEditComponent>){
  this.empForm= this._fb.group({
    firstname: ' ',
    lastname:' ',
    email:' ',
    dob:' ',
    gender: ' ',
    education:'',
    company:'',
    experience:' ',
    package:' ',
  });
 }
 ngOnInit(): void {
     
 }
 onFormSubmit(){
  if(this.empForm.valid){
    this._empservice.addEmployee(this.empForm.value).subscribe({
      next:(val:any)=>{
      alert('Employee added successfully');
      this._dialogRef.close();
      },
      error: (err:any) =>{
        console.error(err)
      }
    })
  }
 }

  
}
