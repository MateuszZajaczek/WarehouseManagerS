import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { ProductListComponent } from './_components/product-list/product-list.component';
import { ReturnsListComponent } from './_components/returns-list/returns-list.component';
import { OrdersListComponent } from './_components/orders-list/orders-list.component';
import { authGuard } from './_guard/auth.guard';
import { adminGuard } from './_guard/admin.guard';
import { AdminRegisterComponent } from './_components/admin/register/register-form.component';
import { AdminPanelComponent } from './_components/admin/admin-panel/admin-panel.component';
import { NewOrderFormComponent } from './_components/new-order-form/new-order-form.component';
import { OrderDetailComponent } from './_components/order-detail/order-detail.component';

export const routes: Routes = [

  { path: '', component: HomeComponent }, // MainPage 
  // Logged in users.
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'products', component: ProductListComponent }, // Products
      { path: 'orders', component: OrdersListComponent }, // Orders
      { path: 'returns', component: ReturnsListComponent }, // Returns
      { path: 'orders/:id', component: OrderDetailComponent}, // Details
    ]
  },

  // Admin only
      { path: 'register', component: AdminRegisterComponent, canActivate: [adminGuard] }, // Register
      { path: 'AdminPanel', component: AdminPanelComponent, canActivate: [adminGuard] }, // AdminPanel - not implemented yet
      { path: 'neworder', component: NewOrderFormComponent, canActivate: [adminGuard] }, //  NewOrder
  // Everyone
      { path: '**', component: HomeComponent, pathMatch: 'full' }, // Redirect to MainPage, for any address.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
