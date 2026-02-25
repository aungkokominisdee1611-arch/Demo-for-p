import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductCreateUpdate, Category } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @ViewChild('productModal') productModal!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  // Form fields
  name = '';
  price: number | null = null;
  categoryId: number | null = null;
  isDiscount = false;
  stock = 0;

  categories: Category[] = [];

  isEdit = false;
  errorMessage: string | null = null;
  submitting = false;
  isLoading = false;

  private productId: number | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    // Categories are loaded when modal opens
  }

  /** OPEN MODAL */
  openModal(
    isEditMode = false,
    productId?: number,
  ): MatDialogRef<any> | undefined {
    this.isEdit = isEditMode;
    this.productId = productId ?? null;

    // Reset form
    this.name = '';
    this.price = null;
    this.categoryId = null;
    this.isDiscount = false;
    this.stock = 0;
    this.errorMessage = null;
    this.submitting = false;
    this.categories = [];

    // Open modal immediately
    this.dialogRef = this.dialog.open(this.productModal, {
      width: '600px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
    });

    this.isLoading = true;
    this.productService.getCategoriesFunction().subscribe({
      next: (cats) => {
        this.categories = cats;

        if (this.isEdit && this.productId !== null) {
          this.productService
            .getProductByIdFunction(this.productId)
            .subscribe((product) => {
              this.name = product.name;
              this.price = product.price;
              this.isDiscount = product.isDiscount;
              this.stock = product.stock ?? 0;

              const found = this.categories.find(
                (c) =>
                  c.id === product.categoryId || c.name === product.category,
              );
              this.categoryId = found ? found.id : null;
              this.isLoading = false;
            });
        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Failed to load categories', err);
        this.errorMessage = 'Failed to load necessary data. Please try again.';
        this.isLoading = false;
      },
    });
    return this.dialogRef;
  }

  /** SUBMIT FORM */
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

    const onComplete = () => {
      this.submitting = false;
      this.closeModal();
      // NOTE: We might want to emit an event here to notify the parent (dashboard) to refresh its data
    };

    const onError = (err: any) => {
      this.submitting = false;
      this.errorMessage =
        err?.error?.message ||
        (this.isEdit
          ? 'Failed to update product.'
          : 'Failed to create product.');
    };

    if (this.isEdit && this.productId !== null) {
      this.productService
        .updateProductFunction(this.productId, body)
        .subscribe(onComplete, onError);
    } else {
      this.productService
        .createProductFunction(body)
        .subscribe(onComplete, onError);
    }
  }

  /** CANCEL BUTTON */
  onCancel() {
    this.closeModal();
  }

  /** CLOSE MODAL */
  closeModal() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
