import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  products: Product[] = [];
  readonly pageSize = 5;
  currentPage = 1;
  categoryFilter: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  get categories(): string[] {
    const set = new Set(this.products.map((p) => p.category));
    return Array.from(set).sort();
  }

  get filteredProducts(): Product[] {
    if (!this.categoryFilter) return this.products;
    return this.products.filter((p) => p.category === this.categoryFilter);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredProducts.length / this.pageSize));
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  get rangeStart(): number {
    return this.filteredProducts.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get rangeEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredProducts.length);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    this.productService.getProductsFunction().subscribe((data: Product[]) => {
      this.products = data;
      this.categoryFilter = null;
      this.currentPage = 1;
    });
  }

  setCategoryFilter(category: string | null) {
    this.categoryFilter = category;
    this.currentPage = 1;
  }

  clearCategoryFilter() {
    this.categoryFilter = null;
    this.currentPage = 1;
  }

  goToPage(page: number) {
    this.currentPage = Math.max(1, Math.min(page, this.totalPages));
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }

  onEdit(id: number) {
    this.router.navigate(['/products', id, 'edit']);
  }

  onView(id: number) {
    this.router.navigate(['/products', id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProductFunction(id).subscribe(
        () => this.loadProducts(),
        () => this.loadProducts()
      );
    }
  }

  onAdd() {
    this.router.navigate(['/products/new']);
  }
}
