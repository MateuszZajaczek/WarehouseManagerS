import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './ItemsList/item-list.component';
import {NavComponent } from './nav/nav.component'
// Importuj inne komponenty według potrzeb


const routes: Routes = [
  { path: 'items', component: ItemListComponent }, // Ścieżka do listy przedmiotów
  // Dodaj inne ścieżki według potrzeb
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
