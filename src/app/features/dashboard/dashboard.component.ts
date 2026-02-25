import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { UserFormComponent } from '../users/user-form/user-form.component';
import { CategoryComponent } from '../users/category/category.component';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  productsCount = 0;
  loading = true;

  // References to child components (popups)
  @ViewChild('productForm') productForm!: UserFormComponent;
  @ViewChild('categoryForm') categoryForm!: CategoryComponent;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductsFunction().subscribe(
      (products) => {
        this.productsCount = products.length;
        this.loading = false;
      },
      () => (this.loading = false),
    );
  }

  // Called from dashboard buttons
  openAddProduct() {
    if (this.productForm) {
      this.productForm.openModal(false); // pass false if needed
    }
  }

  openAddCategory() {
    if (this.categoryForm) {
      this.categoryForm.openModal();
    }
  }
}
