import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../_services/order.service';
import { ProductService } from '../../_services/product.service';
import { AccountService } from '../../_services/account.service';
import { Product } from '../../_models/product';
import { User } from '../../_models/user';

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
  totalAmount: number = 0;
  currentUser: User | null = null;
  orderItems: OrderItem[] = []; // Tablica przechowująca dodane produkty

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    private accountService: AccountService
  ) {
    this.orderForm = this.fb.group({
      userName: [null, Validators.required],
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.currentUser = this.accountService.currentUser();
    if (this.currentUser) {
      this.orderForm.get('userName')?.setValue(this.currentUser.userName);
    }
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => (this.products = products),
      error: (error) => console.log('Błąd podczas ładowania produktów:', error),
    });
  }

  addOrderItem() {
    const productId = Number(this.orderForm.get('productId')?.value);
    const quantity = this.orderForm.get('quantity')?.value;
    const product = this.products.find((p) => p.productId === productId);

    if (product && quantity > 0) {
      const unitPrice = product.unitPrice;
      const totalPrice = unitPrice * quantity;

      const orderItem: OrderItem = {
        productId: productId,
        productName: product.productName,
        quantity: quantity,
        unitPrice: unitPrice,
        totalPrice: totalPrice,
      };

      this.orderItems.push(orderItem);
      this.updateTotalAmount();

      // Resetuj pola formularza
      this.orderForm.get('productId')?.setValue(null);
      this.orderForm.get('quantity')?.setValue(1);
    }
  }

  updateTotalAmount() {
    this.totalAmount = this.orderItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );
  }

  editOrderItem(index: number) {
    const item = this.orderItems[index];
    // Ustaw wartości formularza na wartości wybranego produktu
    this.orderForm.get('productId')?.setValue(item.productId);
    this.orderForm.get('quantity')?.setValue(item.quantity);
    // Usuń produkt z listy, aby można go było ponownie dodać po edycji
    this.orderItems.splice(index, 1);
    this.updateTotalAmount();
  }

  removeOrderItem(index: number) {
    this.orderItems.splice(index, 1);
    this.updateTotalAmount();
  }

  submitOrder() {
    if (this.orderItems.length === 0) {
      return;
    }

    const order = {
      userId: this.currentUser?.userId || 0,
      userName: this.orderForm.get('userName')?.value,
      totalAmount: this.totalAmount,
      orderStatus: 'Pending',
      orderItems: this.orderItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      })),
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        console.log('Zamówienie utworzone pomyślnie');
        // Resetuj formularz i listę produktów
        this.orderForm.reset();
        this.orderItems = [];
        this.totalAmount = 0;
        this.orderForm.get('quantity')?.setValue(1);
      },
      error: (error) => console.log('Błąd podczas tworzenia zamówienia:', error),
    });
  }
}
