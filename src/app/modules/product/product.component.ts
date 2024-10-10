import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product.model';
import {
  selectAllProducts,
  selectLoading,
} from '../../core/store/ngrx/selectors/product.selectors';
import * as ProductActions from '../../core/store/ngrx/actions/product.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  editingProduct: Product | null = null;

  constructor(private readonly store: Store) {
    this.products$ = this.store.select(selectAllProducts);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  createProduct(productForm: NgForm): void {
    const product: Product = {
      id: this.getNewProductId(),
      name: productForm.value.name,
      price: +productForm.value.price,
    };

    this.store.dispatch(ProductActions.createProduct({ product }));
    productForm.reset();
  }

  updateProduct(product: Product): void {
    this.store.dispatch(ProductActions.updateProduct({ product }));
    this.clearEditing();
  }

  deleteProduct(productId: number): void {
    this.store.dispatch(ProductActions.deleteProduct({ productId }));
  }

  setEditingProduct(product: Product): void {
    this.editingProduct = { ...product };
  }

  clearEditing(): void {
    this.editingProduct = null;
  }

  getNewProductId(): number {
    let products: Product[] = [];
    this.products$.subscribe((p) => (products = p));
    return products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  }
}
