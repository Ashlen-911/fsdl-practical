import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  standalone: true,  // Add this if using standalone components
  imports: [CommonModule],  // Add this line to import CommonModule
  template: `
    <div class="container">
      <h1>Simple Shopping Cart</h1>

      <div class="shop-section">
        <div class="products">
          <h2>Available Products</h2>
          <div *ngFor="let product of products" class="product-card">
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p>Price: \${{ product.price | number:'1.2-2' }}</p>
            </div>
            <button class="add-btn" (click)="addToCart(product)">Add to Cart</button>
          </div>
        </div>

        <div class="cart">
          <h2>Your Shopping Cart</h2>
          <div *ngIf="cart.length === 0" class="empty-cart">Your cart is empty</div>
          <div *ngFor="let item of cart" class="cart-item">
            <div class="item-info">
              <h3>{{ item.product.name }}</h3>
              <p>\${{ item.product.price | number:'1.2-2' }} x {{ item.quantity }}</p>
            </div>
            <div class="item-controls">
              <button class="quantity-btn" (click)="adjustQuantity(item, -1)">-</button>
              <span class="quantity">{{ item.quantity }}</span>
              <button class="quantity-btn" (click)="adjustQuantity(item, 1)">+</button>
              <button class="remove-btn" (click)="removeFromCart(item.product)">×</button>
            </div>
          </div>

          <div *ngIf="cart.length > 0" class="total-section">
            <hr>
            <div class="total-row">
              <h3>Total:</h3>
              <h3>\${{ getTotal() | number:'1.2-2' }}</h3>
            </div>
            <button class="clear-btn" (click)="clearCart()">Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    h1 {
      text-align: center;
      color: #2c3e50;
    }

    .shop-section {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 30px;
      margin-top: 30px;
    }

    .products, .cart {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .product-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin: 10px 0;
      background: white;
      border-radius: 5px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .add-btn {
      background: #27ae60;
      color: white;
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .add-btn:hover {
      background: #219a52;
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin: 10px 0;
      background: white;
      border-radius: 5px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .quantity-btn {
      background: #3498db;
      color: white;
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      margin: 0 5px;
      transition: background 0.3s;
    }

    .quantity-btn:hover {
      background: #2980b9;
    }

    .remove-btn {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      margin-left: 10px;
      transition: background 0.3s;
    }

    .remove-btn:hover {
      background: #c0392b;
    }

    .total-section {
      margin-top: 20px;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 15px 0;
    }

    .clear-btn {
      width: 100%;
      background: #e74c3c;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .clear-btn:hover {
      background: #c0392b;
    }

    .empty-cart {
      text-align: center;
      color: #7f8c8d;
      padding: 20px;
    }
  `]
})
export class AppComponent {
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Smartphone', price: 699.99 },
    { id: 3, name: 'Headphones', price: 149.99 },
    { id: 4, name: 'Tablet', price: 299.99 }
  ];

  cart: { product: Product, quantity: number }[] = [];

  addToCart(product: Product) {
    const existing = this.cart.find(item => item.product.id === product.id);
    existing ? existing.quantity++ : this.cart.push({ product, quantity: 1 });
  }

  adjustQuantity(item: any, delta: number) {
    item.quantity += delta;
    if (item.quantity < 1) {
      this.removeFromCart(item.product);
    }
  }

  removeFromCart(product: Product) {
    this.cart = this.cart.filter(item => item.product.id !== product.id);
  }

  clearCart() {
    this.cart = [];
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }
}
