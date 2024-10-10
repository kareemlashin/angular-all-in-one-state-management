import { Injectable } from '@angular/core';
import { PeopleStore, Person } from './people.state';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private peopleStore: PeopleStore) {}

  addPerson(person: Person) {
    this.peopleStore.add(person);
  }

  editPerson(person: Person) {
    this.peopleStore.update(person.id, person);
  }

  removePerson(id: number) {
    this.peopleStore.remove(id);
  }

  loadPeople(people: Person[]) {
    this.peopleStore.setLoading(true);
    this.peopleStore.set(people);
    this.peopleStore.setLoading(false);
  }
}
