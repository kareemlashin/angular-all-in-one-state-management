import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/product.actions';
import { Product } from '../../../models/product.model';

export interface ProductState {
  products: Product[];
  loading: boolean;
}

export const initialState: ProductState = {
  products: [],
  loading: false,
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products,
  })),
  on(ProductActions.createProduct, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
  })),
  on(ProductActions.updateProduct, (state, { product }) => ({
    ...state,
    products: state.products.map((p) => (p.id === product.id ? product : p)),
  })),
  on(ProductActions.deleteProduct, (state, { productId }) => ({
    ...state,
    products: state.products.filter((p) => p.id !== productId),
  }))
);
