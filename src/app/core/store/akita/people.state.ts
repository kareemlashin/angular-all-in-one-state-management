import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface Person {
  id: number;
  name: string;
  age: number;
  email: string;
}

export interface PeopleState extends EntityState<Person> {
  loading: boolean;
}

@StoreConfig({ name: 'people' })
export class PeopleStore extends EntityStore<PeopleState, Person> {
  constructor() {
    super({ loading: false });
  }

  override setLoading(loading: boolean) {
    this.update({ loading });
  }
}
