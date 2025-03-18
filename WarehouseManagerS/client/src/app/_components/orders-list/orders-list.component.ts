import { Component, OnInit, inject } from '@angular/core';
import { OrderService } from '../../_services/order.service';
import { Order } from '../../_models/order';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  filterStatus: string = '';  // empty means no filter
  filterUser: string = '';
  filterDate: string = '';
  accountService = inject(AccountService);
  toastr = inject(ToastrService);

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (orders) => (this.orders = orders),
      error: (error) => console.log('Error loading orders:', error),
    });
  }

  filteredOrders(): Order[] {
    let result = this.orders;

    // Filter by userName if filterUser is not empty
    if (this.filterUser) {
      const searchUser = this.filterUser.toLowerCase();
      result = result.filter(order =>
        order.userName?.toLowerCase().includes(searchUser)
      );
    }

    // Filter by date if filterDate is not empty
    if (this.filterDate) {
      result = result.filter(order => {
        if (!order.orderDate) {
          return false;
        }
        const orderDateStr = new Date(order.orderDate).toISOString().slice(0, 10);
        return orderDateStr === this.filterDate;
      });
    }


    // Filter by status if filterStatus is not empty
    if (this.filterStatus) {
      result = result.filter(order => order.orderStatus === this.filterStatus);
    }

    return result;
  }

  getStatusDotClass(status: string): string {
    if (status === 'Anulowane') return 'dot dot-canceled';
    if (status === 'W trakcie przygotowania') return 'dot dot-inprogress';
    if (status === 'Wysłane') return 'dot dot-complete';
    return '';
  }

  acceptOrder(orderId: number): void {
    // check if it's not accident
    if (!confirm(`Czy na pewno chcesz wysłać zamówienie #${orderId}?`)) {
      return;
    }

    // Call the service method to accept
    this.orderService.acceptOrder(orderId).subscribe({
      next: () => {
        this.toastr.success("Status zaktualizowany. Wysłane")
        console.log(`Zamówienie ${orderId} przyjęte prawidłowo (Wysłane).`);
        // Reload or update local list
        this.loadOrders();
      },
      error: (error) => {
        console.log('Błąd przyjmowania zamówienia:', error);
      },
    });
  }


  cancelOrder(orderId: number): void {
    // 1. Optionally confirm before canceling
    if (!confirm(`Czy na pewno chcesz anulować zamówienie #${orderId}?`)) {
      return;
    }

    // 2. Call the service method to cancel
    this.orderService.cancelOrder(orderId).subscribe({
      next: () => {
        console.log(`Zamówienie ${orderId} anulowane prawidłowo.`);
        // 3. Reload or update the local list
        this.loadOrders();
      },
      error: (error) =>
        console.log('Błąd anulowania zamówienia:', error),
    });
  }
}
