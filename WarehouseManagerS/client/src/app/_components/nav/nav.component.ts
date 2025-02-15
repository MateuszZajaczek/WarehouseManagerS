import { Component, inject } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { Router,  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {

  title = 'Warehouse Manager';
  accountService = inject(AccountService)
  private router = inject(Router);
  private toastr = inject(ToastrService);
  model: any = {};

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/products');
      },
      error: error => {console.log('Error:', error);
      this.toastr.error(error.error);
      }
    });
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('');
  }
}
