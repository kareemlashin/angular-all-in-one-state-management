
- [install]::[npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools @ngrx/router-store]
angular-product-management/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   └── product.model.ts      # Product model definition
│   │   │   └── store/
│   │   │       ├── ngrx/
│   │   │       │   ├── actions/
│   │   │       │   │   └── product.actions.ts  # NgRx actions
│   │   │       │   ├── reducers/
│   │   │       │   │   └── product.reducer.ts  # NgRx reducers
│   │   │       │   └── selectors/
│   │   │       │       └── product.selectors.ts # NgRx selectors
│   │   ├── modules/
│   │   │   └── product/
│   │   │       ├── product.component.ts       # Product component logic
│   │   │       ├── product.component.html      # Product component template
│   │   │       └── product.component.scss      # Product component styles
