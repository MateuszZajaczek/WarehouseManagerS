import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { ProductListComponent } from './_components/product-list/product-list.component';
import { ReturnsListComponent } from './_components/returns-list/returns-list.component';
import { OrdersListComponent } from './_components/orders-list/orders-list.component';
import { authGuard } from './_guard/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { adminGuard } from './_guard/admin.guard';
import { AdminRegisterComponent } from './_components/admin/register/register-form.component';
import { AdminPanelComponent } from './_components/admin/admin-panel/admin-panel.component';
// Importuj inne komponenty według potrzeb


export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ścieżka do strony głównej
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent }, // Ścieżka do strony głównej
      { path: 'products', component: ProductListComponent }, // Ścieżka do listy przedmiotów
      { path: 'orders', component: OrdersListComponent }, // Ścieżka do listy zamówień
      { path: 'returns', component: ReturnsListComponent }, // Ścieżka do listy zwrotów
    ]
  },
  {path: 'register', component: AdminRegisterComponent, canActivate: [adminGuard] }, // Ścieżka do rejestracji administratora
  {path: 'AdminPanel', component: AdminPanelComponent, canActivate: [adminGuard] }, // Ścieżka do panelu administratora

  { path: 'errors', component: TestErrorsComponent }, // Ścieżka do testowania błędów
  { path: '**', component: HomeComponent, pathMatch: 'full' }, //Ścieżka do strony głównej
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
