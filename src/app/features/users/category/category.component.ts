import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  showModal: boolean = true; // controls modal visibility

  name: string = '';
  submitting: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

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

  onCancel() {
    this.closeModal();
  }

  private closeModal() {
    this.showModal = false;
    this.router.navigate(['']);
  }
}
