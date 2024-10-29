import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './ItemsList/item-list.component';
import {NavComponent } from './nav/nav.component'
import {UserListComponent} from './users/user-list/user-list.component'
// Importuj inne komponenty według potrzeb


const routes: Routes = [
  { path: '', component: HomeComponent }, // Ścieżka do strony głównej
  { path: 'items', component: ItemListComponent }, // Ścieżka do listy przedmiotów
  { path: 'users', component: UserListComponent }, // Ścieżka do listy użytkowników
  { path: '**', component: HomeComponent}, //Ścieżka do strony głównej
  

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
