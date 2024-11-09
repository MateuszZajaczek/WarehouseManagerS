import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  const user = accountService.currentUser();
  if (user && user.role === 'Admin') {
    return true;
  } else {
    toastr.error('Access denied. Admins only.');
    return false;
  }
};
