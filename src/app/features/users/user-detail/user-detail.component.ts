import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { EditFormComponent } from '../edit-form/edit-form.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  product: Product | null = null;

  @ViewChild('productForm') productForm!: EditFormComponent;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.productService.getProductByIdFunction(+id).subscribe({
      next: (data) => (this.product = data),
      error: () => (this.product = null),
    });
  }

  onEdit() {
    if (!this.product) return;
    this.productForm.openModal(this.product.id);
  }

  reloadProduct() {
    this.loadProduct();
  }

  onBack() {
    this.router.navigate(['/products']);
  }
}
