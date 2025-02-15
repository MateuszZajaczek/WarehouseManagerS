import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-register',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class AdminRegisterComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['Staff', Validators.required],
  });

  roles = ['Admin', 'Manager', 'Staff'];

  register() {
    if (this.registerForm.invalid) {
      this.toastr.error('Proszę uzupełnić wszystkie pola.');
      return;
    }
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.toastr.success('Sukces. Użytkownik zarejestrowany');
        this.registerForm.reset();
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }
}
