import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Item } from '../../../models/item.model';
import * as ItemActions from '../actions/item.actions';

export interface ItemStateModel {
  items: Item[];
  loading: boolean;
}

@State<ItemStateModel>({
  name: 'items',
  defaults: {
    items: [],
    loading: false,
  },
})
export class ItemState {
  @Selector()
  static getItems(state: ItemStateModel): Item[] {
    return state.items;
  }

  @Selector()
  static getLoading(state: ItemStateModel): boolean {
    return state.loading;
  }

  @Action(ItemActions.LoadItems)
  loadItems(ctx: StateContext<ItemStateModel>): void {
    ctx.patchState({ loading: true });
    const items: Item[] = [
      { id: 1, name: 'Item 1', details: 'Details for item 1' },
      { id: 2, name: 'Item 2', details: 'Details for item 2' },
    ];

    ctx.patchState({
      items: items,
      loading: false,
    });
  }

  @Action(ItemActions.AddItem)
  addItem(
    ctx: StateContext<ItemStateModel>,
    action: ItemActions.AddItem
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      items: [...state.items, action.item],
    });
  }

  @Action(ItemActions.UpdateItem)
  updateItem(
    ctx: StateContext<ItemStateModel>,
    action: ItemActions.UpdateItem
  ): void {
    const state = ctx.getState();
    const items = state.items.map(
      (item) =>
        item.id === action.item.id ? { ...item, ...action.item } : item
    );
    ctx.patchState({ items });
  }

  @Action(ItemActions.DeleteItem)
  deleteItem(
    ctx: StateContext<ItemStateModel>,
    action: ItemActions.DeleteItem
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      items: state.items.filter((item) => item.id !== action.itemId),
    });
  }
}
