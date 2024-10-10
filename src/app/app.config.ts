import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { provideStore as provideStoreNGXS } from '@ngxs/store';
import { ItemState } from './core/store/ngxs/state/item.state';
import { productReducer } from './core/store/ngrx/reducers/product.reducer';
import { PeopleStore } from './core/store/akita/people.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      products: productReducer,
    }),
    provideStoreNGXS([ItemState]),
    PeopleStore
  ],
};
