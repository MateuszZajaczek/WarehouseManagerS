import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../_services/order.service';
import { Order } from '../../_models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  orderId: number | null = null;
  order: Order | null = null;
  orderService = inject(OrderService)
  private router = inject(Router);
  private route = inject(ActivatedRoute); 

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.orderId) {
      this.loadOrder();
    } else {
      console.log('Nieprawidłowe ID zamówienia');
      // Możesz przekierować użytkownika lub wyświetlić komunikat o błędzie
    }
  }

  loadOrder(): void {
    this.orderService.getOrderById(this.orderId!).subscribe({
      next: (order) => (this.order = order),
      error: (error) => console.log('Error loading order:', error),
    });
  }
}
