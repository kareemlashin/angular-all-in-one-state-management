import { Selector } from '@ngxs/store';
import { ItemState, ItemStateModel } from '../state/item.state';
import { Item } from '../../../models/item.model';

export class ItemSelectors {
  @Selector([ItemState])
  static getItems(state: ItemStateModel): Item[] {
    return state.items;
  }

  @Selector([ItemState])
  static getLoading(state: ItemStateModel): boolean {
    return state.loading;
  }
}
