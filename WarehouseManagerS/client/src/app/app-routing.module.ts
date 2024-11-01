import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { ItemListComponent } from './_components/ItemsList/item-list.component';
import { ReturnsListComponent } from './_components/returns-list/returns-list.component';
import { OrdersListComponent } from './_components/orders-list/orders-list.component';
import { authGuard } from './_guard/auth.guard';
// Importuj inne komponenty według potrzeb


const routes: Routes = [
  { path: '', component: HomeComponent }, // Ścieżka do strony głównej
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'items', component: ItemListComponent }, // Ścieżka do listy przedmiotów
      { path: 'orders', component: OrdersListComponent }, // Ścieżka do listy zamówień
      { path: 'returns', component: ReturnsListComponent }, // Ścieżka do listy zwrotów
    ]
  },

  { path: '**', component: HomeComponent, pathMatch: 'full' }, //Ścieżka do strony głównej
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
