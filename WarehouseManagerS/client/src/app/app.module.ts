import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ItemService } from './_services/item.service';
import { NavComponent } from './_components/nav/nav.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ItemListComponent } from './_components/ItemsList/item-list.component';
import { HomeComponent } from './_components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './_components/register/register.component';
import { OrdersListComponent } from './_components/orders-list/orders-list.component';
import { ReturnsListComponent } from './_components/returns-list/returns-list.component';
import { UserDetailComponent } from './_components/user-detail/user-detail.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { provideToastr} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    RegisterComponent,
    HomeComponent,
    OrdersListComponent,
    ReturnsListComponent,
    UserDetailComponent,
    NavComponent,
    

  ],
  imports: [

  
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterLink, 
    RouterLinkActive,
    BsDropdownModule.forRoot(),
    
  ],
  providers: [ItemService, provideAnimations(), provideToastr({
    positionClass: 'toast-bottom-right'
  })],
  bootstrap: [AppComponent]
})
export class AppModule { }
