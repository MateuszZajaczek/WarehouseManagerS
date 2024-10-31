import { Component, inject, output } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  // imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
private accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  private toastr = inject(ToastrService);
  model: any = {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => this.toastr.error(error.error)
    })
  }
  
  cancel() {
    this.cancelRegister.emit(false);
  }
}
