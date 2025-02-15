import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductService } from '../../_services/product.service';
import { Product } from '../../_models/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit, OnDestroy {
  componentDestroyed = new Subject();
  form: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.form = this.fb.group({
      products: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

  loadProducts(): void {
    this.productService
      .getProducts()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe({
        next: (products) => {
          const productsFormArray = this.form.get('products') as FormArray;
          productsFormArray.clear();
          products.forEach((product) => productsFormArray.push(this.createProductFormGroup(product)));
        },
        error: (error) => console.log('Error loading products:', error),
        complete: () => console.log('Request has completed.'),
      });
  }
  
  createProductFormGroup(product: Product): FormGroup {
    return this.fb.group({
      id: [product.productId],
      name: [{ value: product.productName, disabled: true }, Validators.required],
      quantity: [{ value: product.quantityInStock, disabled: true }, Validators.required],
      category: [{ value: product.categoryName, disabled: true }, Validators.required],
      unitPrice: [{ value: product.unitPrice, disabled: true}, Validators.required],
    });
  }
  get productsControls() {
    return (this.form.get('products') as FormArray).controls;
  }
}
