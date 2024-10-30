import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  imports: [BsDropdownModule, FormsModule, RouterLink, RouterLinkActive]
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
  }
}
