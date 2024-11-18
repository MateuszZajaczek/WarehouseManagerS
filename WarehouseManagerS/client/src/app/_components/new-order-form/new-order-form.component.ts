import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { OrderService } from '../../_services/order.service';
import { ProductService } from '../../_services/product.service';
import { Product } from '../../_models/product';
import { Order } from '../../_models/order';
import { AccountService } from '../../_services/account.service'; // Adjust the path
import { User } from '../../_models/user';

@Component({
  selector: 'app-new-order-form',
  templateUrl: './new-order-form.component.html',
  styleUrls: ['./new-order-form.component.css'],
})
export class NewOrderFormComponent implements OnInit {
  orderForm: FormGroup;
  products: Product[] = [];
  totalAmount: number = 0;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    private accountService: AccountService // Inject AccountService
  ) {
    this.orderForm = this.fb.group({
      userName: [null, Validators.required],
      orderItems: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.addOrderItem(); // Start with one order item

    // Set userId to current user's ID
    this.currentUser = this.accountService.currentUser();
    if (this.currentUser) {
      this.orderForm.get('userName')?.setValue(this.currentUser.userName); 
    }
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => (this.products = products),
      error: (error) => console.log('Error loading products:', error),
    });
  }

  get orderItems(): FormArray {
    return this.orderForm.get('orderItems') as FormArray;
  }

  addOrderItem() {
    const orderItemGroup = this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0],
      totalPrice: [0],
    });

    // Update unit price and total price when product or quantity changes
    orderItemGroup.get('productId')?.valueChanges.subscribe((productId) => {
      const product = this.products.find((p) => p.productId == productId);
      if (product) {
        orderItemGroup.get('unitPrice')?.setValue(product.unitPrice);
        this.updateItemTotalPrice(orderItemGroup);
      }
    });

    orderItemGroup.get('quantity')?.valueChanges.subscribe(() => {
      this.updateItemTotalPrice(orderItemGroup);
    });

    this.orderItems.push(orderItemGroup);
  }

  removeOrderItem(index: number) {
    this.orderItems.removeAt(index);
    this.updateTotalAmount();
  }

  updateItemTotalPrice(orderItemGroup: FormGroup) {
    const quantity = orderItemGroup.get('quantity')?.value || 0;
    const unitPrice = orderItemGroup.get('unitPrice')?.value || 0;
    const totalPrice = quantity * unitPrice;
    orderItemGroup.get('totalPrice')?.setValue(totalPrice);
    this.updateTotalAmount();
  }

  updateTotalAmount() {
    this.totalAmount = this.orderItems.controls.reduce((sum, item) => {
      return sum + (item.get('totalPrice')?.value || 0);
    }, 0);
  }

  submitOrder() {
    if (this.orderForm.invalid) {
      return;
    }

    const order: Order = {
      userId: this.orderForm.get('userId')?.value,
      userName: '', // Or fetch/set the appropriate value
      totalAmount: this.totalAmount,
      orderStatus: 'Pending', // Set default status
      orderItems: this.orderItems.value.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      })),
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        console.log('Order created successfully');
        // Reset form or navigate away
        this.orderForm.reset();
        this.orderItems.clear();
        this.addOrderItem();
        this.totalAmount = 0;
      },
      error: (error) => console.log('Error creating order:', error),
    });
  }
}
