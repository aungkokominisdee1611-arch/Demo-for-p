import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCreateUpdate } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  name = '';
  price: number | null = null;
  category = '';
  isDiscount = false;
  stock = 0;
  isEdit = false;
  errorMessage: string | null = null;
  submitting = false;
  private productId: number | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;
      this.isEdit = true;
      this.productService.getProductByIdFunction(this.productId).subscribe(
        (product) => {
          this.name = product.name;
          this.price = product.price;
          this.category = product.category;
          this.isDiscount = product.isDiscount;
          this.stock = product.stock ?? 0;
        },
        (err) => console.error('Load product failed', err)
      );
    }
  }

  onSubmit() {
    const p = this.price ?? 0;
    if (!this.name.trim()) return;
    this.errorMessage = null;
    this.submitting = true;
    const body: ProductCreateUpdate = {
      name: this.name.trim(),
      price: p,
      category: this.category.trim() || 'general',
      isDiscount: this.isDiscount,
      stock: this.stock,
    };
    const nav = () => {
      this.submitting = false;
      this.router.navigate(['/products']);
    };
    if (this.isEdit && this.productId !== null) {
      this.productService.updateProductFunction(this.productId, body).subscribe(
        nav,
        (err) => {
          this.submitting = false;
          this.errorMessage = err?.error?.message || 'Failed to update product.';
        }
      );
    } else {
      this.productService.createProductFunction(body).subscribe(
        nav,
        (err) => {
          this.submitting = false;
          this.errorMessage = err?.error?.message || 'Failed to create product.';
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/products']);
  }
}
