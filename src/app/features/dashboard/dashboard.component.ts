import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  productsCount = 0;
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductsFunction().subscribe(
      (products) => {
        this.productsCount = products.length;
        this.loading = false;
      },
      () => (this.loading = false)
    );
  }
}
