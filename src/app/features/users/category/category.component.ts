import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  @ViewChild('categoryModal') categoryModal!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  name: string = '';
  submitting: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  /** OPEN MODAL */
  openModal() {
    // Reset form
    this.name = '';
    this.submitting = false;
    this.errorMessage = null;

    this.dialogRef = this.dialog.open(this.categoryModal, {
      width: '600px',
      disableClose: true, // prevent clicking outside to close
    });
  }

  /** SUBMIT FORM */
  onSubmit() {
    if (!this.name.trim()) return;

    this.submitting = true;
    this.errorMessage = null;

    this.productService.createCategory({ name: this.name.trim() }).subscribe({
      next: (res) => {
        this.submitting = false;
        this.closeModal();
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err?.error?.message || 'Failed to create category';
      },
    });
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
