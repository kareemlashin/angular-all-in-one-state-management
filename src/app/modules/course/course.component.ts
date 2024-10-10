import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../core/store/Elf/course.store';
import { CommonModule } from '@angular/common';
import { Course } from '../../core/models/course.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  courses$!: Observable<Course[]>;
  courseForm!: FormGroup;
  isEditMode = false;

  currentCourse: Course | null = null;

  constructor(private readonly courseService: CourseService, private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.courses$ = this.courseService.getCourses();
    this.initializeForm();
  }


  initializeForm() {
    this.courseForm = this.fb.group({
      id: [null],
      name: [''],
      description: [''],
    });
  }

  saveCourse() {
    const course: Course = this.courseForm.value;
    if (this.isEditMode && this.currentCourse) {
      this.courseService.updateCourse(course);
    } else {
      this.courseService.addCourse(course);
    }
    this.resetForm();
  }

  editCourse(course: Course) {
    this.currentCourse = course;
    this.isEditMode = true;
    this.courseForm.patchValue(course);
  }

  deleteCourse(id: Course) {
    this.courseService.deleteCourse(id);
  }

  resetForm() {
    this.isEditMode = false;
    this.currentCourse = null;
    this.courseForm.reset();
  }
}
