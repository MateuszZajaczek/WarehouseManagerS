import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../_services/order.service';
import { ProductService } from '../../_services/product.service';
import { AccountService } from '../../_services/account.service';
import { Product } from '../../_models/product';
import { User } from '../../_models/user';
import { ToastrService } from 'ngx-toastr';

interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

@Component({
  selector: 'app-new-order-form',
  templateUrl: './new-order-form.component.html',
  styleUrl: './new-order-form.component.css',
})
export class NewOrderFormComponent implements OnInit {
  orderForm: FormGroup;
  products: Product[] = [];
  totalAmount = 0;
  currentUser: User | null = null;
  orderItems: OrderItem[] = [];
  private toastr = inject(ToastrService);

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    private accountService: AccountService
  ) {
    this.orderForm = this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.currentUser = this.accountService.currentUser();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => (this.products = products),
      error: () => this.toastr.error('Błąd podczas ładowania produktów', 'Błąd'),
    });
  }

  addOrderItem(): void {
    const { productId, quantity } = this.orderForm.value;
    const product = this.products.find((p) => p.productId === Number(productId));

    if (!product || quantity <= 0) return;

    this.orderItems.push({
      productId,
      productName: product.productName,
      quantity,
      unitPrice: product.unitPrice,
      totalPrice: product.unitPrice * quantity,
    });

    this.updateTotalAmount();
    this.orderForm.patchValue({ productId: null, quantity: 1 });
  }

  updateTotalAmount(): void {
    this.totalAmount = this.orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  editOrderItem(index: number): void {
    this.orderForm.patchValue(this.orderItems[index]);
    this.removeOrderItem(index);
  }

  removeOrderItem(index: number): void {
    this.orderItems.splice(index, 1);
    this.updateTotalAmount();
  }

  submitOrder(): void {
    if (!this.orderItems.length) return;

    const order = {
      userId: this.currentUser?.userId || 0,
      totalAmount: this.totalAmount,
      orderItems: this.orderItems.map(({ productId, quantity, unitPrice, totalPrice }) => ({
        productId,
        quantity,
        unitPrice,
        totalPrice,
      })),
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        this.toastr.success('Zamówienie utworzono pomyślnie!', 'Sukces');
        this.orderForm.reset();
        this.orderItems = [];
        this.totalAmount = 0;
        this.orderForm.patchValue({ quantity: 1 });
      },
      error: () => this.toastr.error('Nie udało się utworzyć zamówienia', 'Błąd'),
    });
  }
}
