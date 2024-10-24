import { Component, OnInit, inject } from '@angular/core';
import { RegisterComponent } from '../home/register/register.component';
import { AccountService } from '../_services/account.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private accountService = inject(AccountService);
  users: any;
  registerMode = false;
  componentDestroyed = new Subject();
  http = inject(HttpClient);


  registerToggle() {
    this.registerMode = !this.registerMode
  }

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }
  getUsers() {
    this.http.get('https://localhost:5001/users').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }
}
