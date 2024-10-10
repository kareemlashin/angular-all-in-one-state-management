import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: Employee[] = [
    { id: 1, name: 'John Doe', position: 'Developer', salary: 60000 },
    { id: 2, name: 'Jane Smith', position: 'Manager', salary: 75000 },
  ];
  private employeesSubject = new BehaviorSubject<Employee[]>(this.employees);

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  createEmployee(employee: Employee): void {
    this.employees.push(employee);
    this.employeesSubject.next(this.employees);
  }

  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex((emp) => emp.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
      this.employeesSubject.next(this.employees);
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter((emp) => emp.id !== id);
    this.employeesSubject.next(this.employees);
  }
}
