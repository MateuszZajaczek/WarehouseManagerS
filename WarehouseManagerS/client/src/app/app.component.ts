import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ItemService } from './_services/item.service';
import { Item } from './_models/item';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',],
  imports: [RouterOutlet, NavComponent]
})
export class AppComponent implements OnInit {
  componentDestroyed = new Subject();
  form: FormGroup;
  categories = ['Miscellaneous', 'Tools', 'Electronics', 'Claims'];
  private lastAction: { action: string, item: Item, index: number } | null = null;
  http = inject(HttpClient);
  private accountService = inject(AccountService);
  users: any;

  constructor(private itemService: ItemService, private fb: FormBuilder) {
    this.form = this.fb.group({
      items: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadItems();
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

  loadItems(): void {
    this.itemService.getItems().pipe(takeUntil(this.componentDestroyed)).subscribe({
      next: items => {
        const itemsFormArray = this.form.get('items') as FormArray;
        itemsFormArray.clear();
        items.forEach(item => itemsFormArray.push(this.createItemFormGroup(item)));
      },
      error: error => console.log(error),
      complete: () => console.log('Request has completed.')
    });
  }

  createItemFormGroup(item: Item): FormGroup {
    return this.fb.group({
      id: [item.id],
      name: [{ value: item.name, disabled: true }, Validators.required],
      quantity: [{ value: item.quantity, disabled: true }, Validators.required],
      category: [{ value: item.category, disabled: true }, Validators.required],
      isEditing: [false]
    });
  }

  get itemsControls() {
    return (this.form.get('items') as FormArray).controls;
  }

  startEdit(index: number): void {
    const itemFormGroup = this.itemsControls[index] as FormGroup;
    itemFormGroup.get('isEditing')?.setValue(true);
    itemFormGroup.get('name')?.enable();
    itemFormGroup.get('quantity')?.enable();
    itemFormGroup.get('category')?.enable();
  }

  saveItem(index: number): void {
    const itemFormGroup = this.itemsControls[index] as FormGroup;
    const updatedItem: Item = itemFormGroup.value;
    if (updatedItem.id === 0) {
      // Nowy element, który należy dodać do bazy danych
      this.itemService.addItem(updatedItem).subscribe({
        next: newItem => {
          itemFormGroup.get('id')?.setValue(newItem.id);
          this.lastAction = { action: 'add', item: newItem, index };
          itemFormGroup.get('isEditing')?.setValue(false);
          itemFormGroup.get('name')?.disable();
          itemFormGroup.get('quantity')?.disable();
          itemFormGroup.get('category')?.disable();
        },
        error: error => console.log(error)
      });
    } else {
      // Istniejący element, który należy zaktualizować
      this.itemService.editItem(updatedItem).subscribe({
        next: () => {
          this.lastAction = { action: 'edit', item: this.itemsControls[index].value, index };
          itemFormGroup.get('isEditing')?.setValue(false);
          itemFormGroup.get('name')?.disable();
          itemFormGroup.get('quantity')?.disable();
          itemFormGroup.get('category')?.disable();
        },
        error: error => console.log(error)
      });
    }
  }

  deleteItem(index: number): void {
    const item = this.itemsControls[index].value;
    if (item.id === 0) {
      // Nowy element, który jeszcze nie został zapisany w bazie danych
      (this.form.get('items') as FormArray).removeAt(index);
    } else {
      // Istniejący element, który należy usunąć z bazy danych
      this.itemService.deleteItem(item.id).subscribe({
        next: () => {
          this.lastAction = { action: 'delete', item, index };
          const itemsFormArray = this.form.get('items') as FormArray;
          itemsFormArray.removeAt(index);
          
        },
        error: error => console.log(error)
      });
    }
  }

  undoLastAction(): void {
    if (this.lastAction) {
      if (this.lastAction.action === 'delete') {
        const itemToRestore = this.lastAction.item;
        this.itemService.editItem(itemToRestore).subscribe({
          next: () => {
            const itemsFormArray = this.form.get('items') as FormArray;
            itemsFormArray.insert(this.lastAction!.index, this.createItemFormGroup(itemToRestore));
            this.lastAction = null;
          },
          error: error => console.log(error)
        });
      } else if (this.lastAction.action === 'edit' || this.lastAction.action === 'add') {
        const previousItem = this.lastAction.item;
        this.itemService.editItem(previousItem).subscribe({
          next: () => {
            const itemsFormArray = this.form.get('items') as FormArray;
            itemsFormArray.setControl(this.lastAction!.index, this.createItemFormGroup(previousItem));
            this.lastAction = null;
          },
          error: error => console.log(error)
        });
      }
    }
  }

  addItem(): void {
    const newItem: Item = { id: 0, name: '', quantity: 0, category: this.categories[0] };
    const itemsFormArray = this.form.get('items') as FormArray;
    const newItemFormGroup = this.createItemFormGroup(newItem);
    newItemFormGroup.get('isEditing')?.setValue(true);
    newItemFormGroup.get('name')?.enable();
    newItemFormGroup.get('quantity')?.enable();
    newItemFormGroup.get('category')?.enable();
    itemsFormArray.insert(0, newItemFormGroup);
  }



  reassignIds(): void {
    const itemsFormArray = this.form.get('items') as FormArray;
    itemsFormArray.controls.forEach((group, index) => {
      (group as FormGroup).get('id')?.setValue(index + 1);
    });
  }

}
