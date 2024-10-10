import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../core/models/item.model';
import { ItemState } from '../../core/store/ngxs/state/item.state';
import { Store } from '@ngxs/store';
import * as ItemActions from '../../core/store/ngxs/actions/item.actions';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent {
  items$: Observable<Item[]>;
  loading$: Observable<boolean>;
  editingItem: Item | null = null;

  constructor(private _store: Store) {
    this.items$ = this._store.select(ItemState.getItems);
    this.loading$ = this._store.select(ItemState.getLoading);
  }

  ngOnInit(): void {
    this._store.dispatch(new ItemActions.LoadItems());
  }

  createItem(form: NgForm): void {
    const newItem: Item = {
      id: Math.floor(Math.random() * 1000),
      ...form.value,
    };
    this._store.dispatch(new ItemActions.AddItem(newItem));
    form.resetForm();
  }

  updateItem(form: NgForm): void {
    if (!this.editingItem) return;
    const updatedItem: Item = {
      ...this.editingItem,
      ...form.value,
    };
    this._store.dispatch(new ItemActions.UpdateItem(updatedItem));
    this.clearEditing();
    form.resetForm();
  }

  deleteItem(itemId: number): void {
    this._store.dispatch(new ItemActions.DeleteItem(itemId));
  }

  setEditingItem(item: Item): void {
    this.editingItem = { ...item };
  }

  clearEditing(): void {
    this.editingItem = null;
  }
}
