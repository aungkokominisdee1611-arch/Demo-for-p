import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCreateUpdate, Category } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() showModal: boolean = true;
  name = '';
  price: number | null = null;
  categoryId: number | null = null;
  isDiscount = false;
  stock = 0;

  categories: Category[] = [];

  isEdit = false;
  errorMessage: string | null = null;
  submitting = false;

  private productId: number | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;
      this.isEdit = true;
    }

    this.productService.getCategoriesFunction().subscribe({
      next: (cats) => {
        this.categories = cats;

        if (this.isEdit && this.productId !== null) {
          this.productService.getProductByIdFunction(this.productId).subscribe(
            (product) => {
              this.name = product.name;
              this.price = product.price;
              this.isDiscount = product.isDiscount;
              this.stock = product.stock ?? 0;

              const found = this.categories.find(
                (c) =>
                  c.id === product.categoryId || c.name === product.category,
              );

              this.categoryId = found ? found.id : null;
            },
            (err) => {
              console.error('Failed to load product', err);
            },
          );
        }
      },
      error: (err) => {
        console.error('Failed to load categories', err);
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

    const nav = () => {
      this.submitting = false;
      this.closeModal();
    };

    if (this.isEdit && this.productId !== null) {
      this.productService
        .updateProductFunction(this.productId, body)
        .subscribe(nav, (err) => {
          this.submitting = false;
          this.errorMessage =
            err?.error?.message || 'Failed to update product.';
        });
    } else {
      this.productService.createProductFunction(body).subscribe(nav, (err) => {
        this.submitting = false;
        this.errorMessage = err?.error?.message || 'Failed to create product.';
      });
    }
  }

  onCancel() {
    this.closeModal();
  }

  private closeModal() {
    this.showModal = false;

    this.router.navigate(['/products']);
  }
}
