import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from '../actions/product.actions';
import { switchMap } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() => [
        ProductActions.loadProductsSuccess({ products: [] }),
      ])
    )
  );
}
