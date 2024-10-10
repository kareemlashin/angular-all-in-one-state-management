import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { PeopleState, PeopleStore, Person } from './people.state';

@Injectable({
  providedIn: 'root',
})
export class PeopleQuery extends QueryEntity<PeopleState, Person> {
  constructor(protected override store: PeopleStore) {
    super(store);
  }

  getAllPeople() {
    return this.selectAll();
  }

  getPersonById(id: number) {
    return this.selectEntity(id);
  }

  isLoading() {
    return this.select('loading');
  }
}
