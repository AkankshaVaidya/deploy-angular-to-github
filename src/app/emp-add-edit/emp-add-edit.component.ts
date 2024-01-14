import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreServiceService } from '../core/core-service.service';

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
             private _dialogRef: MatDialogRef<EmpAddEditComponent>,
             @Inject(MAT_DIALOG_DATA) public data:any,
             private _coreService : CoreServiceService){
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
  this.empForm.patchValue(this.data);
     
 }
 onFormSubmit(){
  if(this.empForm.valid){
    if(this.data){
      this._empservice.updateEmployee(this.data.id ,this.empForm.value).subscribe({
        next:(val:any)=>{
        this._coreService.openSnackBar('Employee deatil updated'); 
        this._dialogRef.close(true);
        },
        error: (err:any) =>{
          console.error(err)
        }
      })

    }else{
      this._empservice.addEmployee(this.empForm.value).subscribe({
        next:(val:any)=>{
        this._coreService.openSnackBar('Employee added successfully','done'); 
        this._dialogRef.close(true);
        },
        error: (err:any) =>{
          console.error(err)
        }
      })
    }
    
  }
 }

  
}
