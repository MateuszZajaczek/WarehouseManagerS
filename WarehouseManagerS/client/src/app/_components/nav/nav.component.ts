import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router,  } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {

  title = 'Warehouse Manager';
  accountService = inject(AccountService)
  private router = inject(Router);
  model: any = {};


  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/items');
      },
      error: error => console.log(error)
    });
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
