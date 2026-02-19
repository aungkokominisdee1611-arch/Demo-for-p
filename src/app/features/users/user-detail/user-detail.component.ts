import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductByIdFunction(+id).subscribe({
        next: (data) => (this.product = data),
        error: () => (this.product = null),
      });
    }
  }

  onEdit() {
    if (this.product) {
      this.router.navigate(['/products', this.product.id, 'edit']);
    }
  }

  onBack() {
    this.router.navigate(['/products']);
  }
}
