import {
  Component,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { ProductCreateUpdate, Category } from '../../../models/product.model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent {
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  @Output() updated = new EventEmitter<boolean>();

  name: string = '';
  price: number | null = null;
  categoryId: number | null = null;
  isDiscount: boolean = false;
  stock: number = 0;

  categories: Category[] = [];

  submitting: boolean = false;
  errorMessage: string | null = null;

  private productId!: number;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
  ) {}

  openModal(productId: number) {
    this.productId = productId;
    this.errorMessage = null;
    this.submitting = false;

    // Load categories first
    this.productService.getCategoriesFunction().subscribe({
      next: (cats) => {
        this.categories = cats;

        // Then load product
        this.productService.getProductByIdFunction(productId).subscribe({
          next: (product) => {
            this.name = product.name;
            this.price = product.price;
            this.isDiscount = product.isDiscount;
            this.stock = product.stock ?? 0;

            const found = this.categories.find(
              (c) => c.id === product.categoryId || c.name === product.category,
            );
            this.categoryId = found ? found.id : null;

            // Open dialog
            this.dialogRef = this.dialog.open(this.editModal, {
              width: '800px',
              disableClose: true,
            });
          },
          error: () => {
            this.errorMessage = 'Failed to load product data.';
          },
        });
      },
      error: () => {
        this.errorMessage = 'Failed to load categories.';
      },
    });
  }

  onSubmit() {
    if (!this.name.trim() || !this.categoryId) return;

    this.submitting = true;
    this.errorMessage = null;

    const body: ProductCreateUpdate = {
      name: this.name.trim(),
      price: this.price ?? 0,
      categoryId: this.categoryId,
      isDiscount: this.isDiscount,
      stock: this.stock,
    };

    this.productService.updateProductFunction(this.productId, body).subscribe({
      next: () => {
        this.submitting = false;

        this.updated.emit(true);

        if (this.dialogRef) {
          this.dialogRef.close();
        }
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err?.error?.message || 'Failed to update product.';
      },
    });
  }

  onCancel() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
