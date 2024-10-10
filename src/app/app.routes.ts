import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ngrx',
    loadComponent: () => import('./modules/product/product.component').then(m => m.ProductComponent),
  },
  {
    path: 'ngxs',
    loadComponent: () => import('./modules/topics/topics.component').then(m => m.TopicsComponent),
  },
  {
    path: 'eif',
    loadComponent: () => import('./modules/course/course.component').then(m => m.CourseComponent),
  },
  {
    path: 'akita',
    loadComponent: () => import('./modules/person/person.component').then(m => m.PersonComponent),
  },
  {
    path: 'rxjs',
    loadComponent: () => import('./modules/employee/employee.component').then(m => m.EmployeeComponent),
  },
  {
    path: 'signal',
    loadComponent: () => import('./modules/members/members.component').then(m => m.MembersComponent),
  },
  {
    path: '',
    redirectTo: 'ngrx',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'ngrx',
    pathMatch: 'full'
  }

];
