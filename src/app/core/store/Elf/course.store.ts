import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';
import { Course } from '../../models/course.model';

export interface CourseState {
  courses: Course[];
}

const courseStore = createStore(
  { name: 'courses' },
  withProps<CourseState>({ courses: [] })
);

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor() {}

  addCourse(course: Course) {
    courseStore.update((state) => ({
      courses: [...state.courses, course],
    }));
  }

  updateCourse(course: Course) {
    courseStore.update((state) => ({
      courses: state.courses.map((c) => (c.id === course.id ? course : c)),
    }));
  }

  deleteCourse(id: Course) {
    courseStore.update((state) => ({
      courses: state.courses.filter((course) => course !== id),
    }));
  }

  getCourses() {
    return courseStore.pipe(select((state: any) => state.courses));
  }
}
