import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ItemService } from './_services/item.service';
import { NavComponent } from './_components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ItemListComponent } from './_components/ItemsList/item-list.component';
import { HomeComponent } from './_components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './_components/register/register.component';
import { OrdersListComponent } from './_components/orders-list/orders-list.component';
import { ReturnsListComponent } from './_components/returns-list/returns-list.component';
import { UserDetailComponent } from './_components/user-detail/user-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    // NavComponent,
    ItemListComponent,
    RegisterComponent,
    HomeComponent,
    OrdersListComponent,
    ReturnsListComponent,
    UserDetailComponent,

  ],
  imports: [

    NavComponent,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
