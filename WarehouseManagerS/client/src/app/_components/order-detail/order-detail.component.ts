// order-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.orderId) {
      this.loadOrder();
    }
  }

  loadOrder(): void {
    this.orderService.getOrderById(this.orderId!).subscribe({
      next: (order) => (this.order = order),
      error: (error) => console.log('Error loading order:', error),
    });
  }
}
