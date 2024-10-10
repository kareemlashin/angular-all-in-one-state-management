import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeopleService } from '../../core/store/akita/people.service';
import { PeopleQuery } from '../../core/store/akita/people.query';
import { Person } from '../../core/store/akita/people.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  people: Person[] = [];
  loading: boolean = false;

  personForm: FormGroup;
  isEditMode: boolean = false;
  currentPerson: Person | null = null;

  constructor(
    private readonly peopleService: PeopleService,
    private readonly peopleQuery: PeopleQuery,
    private readonly fb: FormBuilder
  ) {
    this.personForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.loadPeople()
    this.peopleQuery.selectAll().subscribe((people) => {
      this.people = people;
    });

    this.peopleQuery.isLoading().subscribe((loading) => {
      this.loading = loading;
    });
  }

  addPerson() {
    const newPerson: Person = {
      id: Date.now(),
      name: this.personForm.value.name,
      age: this.personForm.value.age,
      email: this.personForm.value.email
    };
    this.peopleService.addPerson(newPerson);
    this.resetForm();
  }

  editPerson(person: Person) {
    this.isEditMode = true;
    this.currentPerson = person;
    this.personForm.patchValue({
      name: person.name,
      age: person.age,
      email: person.email,
    });
  }

  savePerson() {
    if (this.currentPerson) {
      const updatedPerson: Person = {
        ...this.currentPerson,
        name: this.personForm.value.name,
        age: this.personForm.value.age,
        email: this.personForm.value.email
      };
      this.peopleService.editPerson(updatedPerson);
      this.resetForm();
    }
  }

  removePerson(id: number) {
    this.peopleService.removePerson(id);
  }

  loadPeople() {
    const peopleToLoad: Person[] = [
      { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    ];
    this.peopleService.loadPeople(peopleToLoad);
  }

  resetForm() {
    this.personForm.reset();
    this.isEditMode = false;
    this.currentPerson = null;
  }
}
