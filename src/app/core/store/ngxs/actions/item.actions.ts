import { Item } from '../../../models/item.model';

export class LoadItems {
  static readonly type = '[Item] Load Items';
}

export class AddItem {
  static readonly type = '[Item] Add Item';
  constructor(public item: Item) {}
}

export class UpdateItem {
  static readonly type = '[Item] Update Item';
  constructor(public item: Item) {}
}

export class DeleteItem {
  static readonly type = '[Item] Delete Item';
  constructor(public itemId: number) {}
}
