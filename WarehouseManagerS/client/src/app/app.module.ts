import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavComponent } from './_components/nav/nav.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { AuthInterceptor } from './_interceptors/auth.interceptor';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProductListComponent } from './_components/product-list/product-list.component';
import { HomeComponent } from './_components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { OrdersListComponent } from './_components/orders-list/orders-list.component';
import { ReturnsListComponent } from './_components/returns-list/returns-list.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { AdminRegisterComponent } from './_components/admin/register/register-form.component';
import { AdminPanelComponent } from './_components/admin/admin-panel/admin-panel.component';
import { NewOrderFormComponent } from './_components/new-order-form/new-order-form.component';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './_components/order-detail/order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HomeComponent,
    OrdersListComponent,
    ReturnsListComponent,
    NavComponent,
    AdminRegisterComponent,
    AdminPanelComponent,
    NewOrderFormComponent,
    OrderDetailComponent
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
    CommonModule,
    BsDropdownModule.forRoot(),
  ],

  exports:
  [NewOrderFormComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  provideAnimations(),
  provideToastr({
    positionClass: 'toast-bottom-right'
  })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
