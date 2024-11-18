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
  categories = ['Oswietlenie Wewnetrzne', 'Oswietlenie Zewnetrzne', 'Zarówki'];

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
          console.log('Received products:', products); // Add this line
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
      isEditing: [false],
    });
  }

  get productsControls() {
    return (this.form.get('products') as FormArray).controls;
  }
  

  startEdit(index: number): void {
    const productFormGroup = this.productsControls[index] as FormGroup;
    productFormGroup.get('isEditing')?.setValue(true);
    productFormGroup.get('name')?.enable();
    productFormGroup.get('quantity')?.enable();
    productFormGroup.get('category')?.enable();
  }

  saveProduct(index: number): void {
    const productFormGroup = this.productsControls[index] as FormGroup;
    const updatedProduct: Product = productFormGroup.value;
    if (updatedProduct.productId === 0) {
      // New item to add to the database
      this.productService.addProduct(updatedProduct).subscribe({
        next: (newProduct) => {
          productFormGroup.get('id')?.setValue(newProduct.productId);
          productFormGroup.get('isEditing')?.setValue(false);
          productFormGroup.get('name')?.disable();
          productFormGroup.get('quantity')?.disable();
          productFormGroup.get('category')?.disable();
        },
        error: (error) => console.log(error),
      });
    } else {
      // Existing item to update
      this.productService.editProduct(updatedProduct).subscribe({
        next: () => {
          productFormGroup.get('isEditing')?.setValue(false);
          productFormGroup.get('name')?.disable();
          productFormGroup.get('quantity')?.disable();
          productFormGroup.get('category')?.disable();
        },
        error: (error) => console.log(error),
      });
    }
  }

  deleteProduct(index: number): void {
    const product = this.productsControls[index].value;
    if (product.id === 0) {
      // New item not yet saved to the database
      (this.form.get('products') as FormArray).removeAt(index);
    } else {
      // Existing item to delete from the database
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          const productsFormArray = this.form.get('products') as FormArray;
          productsFormArray.removeAt(index);
        },
        error: (error) => console.log(error),
      });
    }
  }

  addProduct(): void {
    const newProduct: Product = { productId: 0, productName: '', quantityInStock: 0, categoryName: '', unitPrice: 0 };
    const productsFormArray = this.form.get('products') as FormArray;
    const newProductFormGroup = this.createProductFormGroup(newProduct);
    newProductFormGroup.get('isEditing')?.setValue(true);
    newProductFormGroup.get('name')?.enable();
    newProductFormGroup.get('quantity')?.enable();
    newProductFormGroup.get('category')?.enable();
    productsFormArray.insert(0, newProductFormGroup);
  }
}
