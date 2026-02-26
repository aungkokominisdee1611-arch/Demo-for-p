import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ProductCreateUpdate,
  Category,
  Product,
} from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @ViewChild('productModal') productModal!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  @Output() updated = new EventEmitter<void>();

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
    private dialog: MatDialog,
  ) {}

  ngOnInit() {}

  // ================= OPEN MODAL =================
  openModal(isEditMode = false, productId?: number) {
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

    this.dialogRef = this.dialog.open(this.productModal, {
      width: '600px',
      disableClose: true,
    });

    this.isLoading = true;

    // Load categories first
    this.productService.getCategoriesFunction().subscribe({
      next: (cats) => {
        this.categories = cats;

        // If editing → load product
        if (this.isEdit && this.productId) {
          this.productService.getProductByIdFunction(this.productId).subscribe({
            next: (product: Product) => {
              this.name = product.name;
              this.price = product.price;
              this.isDiscount = product.isDiscount;
              this.stock = product.stock ?? 0;

              // 🔥 Convert category name → categoryId
              const found = this.categories.find(
                (c) => c.name === product.category,
              );

              this.categoryId = found ? found.id : null;

              this.isLoading = false;
            },
            error: () => {
              this.errorMessage = 'Failed to load product.';
              this.isLoading = false;
            },
          });
        } else {
          this.isLoading = false;
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load categories.';
        this.isLoading = false;
      },
    });
  }

  // ================= SUBMIT =================
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

    if (this.isEdit && this.productId) {
      this.productService
        .updateProductFunction(this.productId, body)
        .subscribe({
          next: () => this.handleSuccess(),
          error: () => this.handleError(),
        });
    } else {
      this.productService.createProductFunction(body).subscribe({
        next: () => this.handleSuccess(),
        error: () => this.handleError(),
      });
    }
  }

  private handleSuccess() {
    this.submitting = false;

    // 🔥 Tell parent to reload list
    this.updated.emit();

    this.closeModal();
  }

  private handleError() {
    this.submitting = false;
    this.errorMessage = this.isEdit
      ? 'Failed to update product.'
      : 'Failed to create product.';
  }

  onCancel() {
    this.closeModal();
  }

  closeModal() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
