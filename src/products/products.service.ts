import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number): string {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(prodId: string): Product {
    const [, product] = this.findProduct(prodId);
    return { ...product };
  }

  updateProduct(prodId: string, title: string, desc: string, price: number) {
    const [proIndex, product] = this.findProduct(prodId);
    const updatedProd = { ...product };
    if (title) {
      updatedProd.title = title;
    }
    if (desc) {
      updatedProd.desc = desc;
    }
    if (price) {
      updatedProd.price = price;
    }

    this.products[proIndex] = updatedProd;
  }

  deleteProduct(prodId: string) {
    const [prodIndex] = this.findProduct(prodId);
    this.products.splice(prodIndex, 1);
  }

  private findProduct(prodId: string): [number, Product] {
    const prodIndex = this.products.findIndex((prod) => prod.id === prodId);
    const product = this.products[prodIndex];

    if (!product) {
      throw new NotFoundException("Couldn't find product");
    }
    return [prodIndex, product];
  }
}
