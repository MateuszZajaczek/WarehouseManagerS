import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductService } from './_services/product.service';
import { NavComponent } from './_components/nav/nav.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProductListComponent } from './_components/product-list/product-list.component';
import { HomeComponent } from './_components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
/*import { RegisterComponent } from './_components/register/register.component';*/
import { OrdersListComponent } from './_components/orders-list/orders-list.component';
import { ReturnsListComponent } from './_components/returns-list/returns-list.component';
import { UserDetailComponent } from './_components/user-detail/user-detail.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { AdminRegisterComponent } from './_components/admin/register/register-form.component';
import { AdminPanelComponent } from './_components/admin/admin-panel/admin-panel.component';
import { AuthInterceptor } from './_interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    /*    RegisterComponent,*/
    HomeComponent,
    OrdersListComponent,
    ReturnsListComponent,
    UserDetailComponent,
    NavComponent,
    AdminRegisterComponent,
    AdminPanelComponent,
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
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ProductService,
  provideAnimations(),
  provideToastr({
    positionClass: 'toast-bottom-right'
  })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
