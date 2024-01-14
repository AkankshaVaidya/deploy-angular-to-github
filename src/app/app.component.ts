import { Component, OnInit , ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'firstname', 
    'lastname', 
    'email',
    'dob' ,
   'gender',
  'education',
  'company',
  'experience',
  'package',
  'action'
];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _dialog: MatDialog,private _empService:EmployeeService){}

  openAddEmpEditForm(){
    this._dialog.open(EmpAddEditComponent);
  }
  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next:(res) =>{
      this.dataSource= new MatTableDataSource(res);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
      },
      error:console.log,
    })
  }
  ngOnInit(): void {
      this.getEmployeeList();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(id:number){
   this._empService.deleteEmployee(id).subscribe({
    next: (res) =>{
      alert('Employee deleted');
    },
    error:console.log,
   });
  }
}
