import { Component, OnInit, inject } from '@angular/core';
import { OrderService } from '../../_services/order.service';
import { Order } from '../../_models/order';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }
  accountService = inject(AccountService)

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => (this.orders = orders),
      error: (error) => console.log('Error loading orders:', error),
    });
  }
}
