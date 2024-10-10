import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../core/models/employee.model';
import { EmployeeService } from '../../core/store/rxjs/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  newEmployee: Employee = { id: 0, name: '', position: '', salary: 0 };
  updateEmployeeId: number | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data:any) => (this.employees = data),
      error: (error:any) => console.error('Error fetching employees:', error),
    });
  }

  createEmployee() {
    const employee: Employee = {
      id: this.employees.length ? Math.max(...this.employees.map(e => e.id)) + 1 : 1,
      name: this.newEmployee.name,
      position: this.newEmployee.position,
      salary: this.newEmployee.salary,
    };
    this.employeeService.createEmployee(employee);
    this.resetForm();
  }

  editEmployee(employee: Employee) {
    this.newEmployee = { ...employee };
    this.updateEmployeeId = employee.id;
  }

  updateEmployee() {
    if (this.updateEmployeeId) {
      this.employeeService.updateEmployee({
        ...this.newEmployee,
        id: this.updateEmployeeId,
      });
      this.resetForm();
    }
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id);
  }

  private resetForm() {
    this.newEmployee = { id: 0, name: '', position: '', salary: 0 };
    this.updateEmployeeId = null;
  }
}
