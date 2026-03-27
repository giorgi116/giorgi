import { Component, signal } from '@angular/core';
import { Service } from '../service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-kalata',
  imports: [RouterLink],
  templateUrl: './kalata.html',
  styleUrl: './kalata.css',
})
export class Kalata {
  constructor(public service: Service) {
    this.kalataProducts();
  }

  kalataList = signal<any[]>([]);
  total = signal<number>(0);

  kalataProducts() {
    this.service.kalata().subscribe((data: any) => {
      this.kalataList.set(data);
      if (data.length > 0) {
        let totalPrice = data.map((item: any) => item.price * item.quantity).reduce((x: any, y: any) => x + y);
        this.total.set(totalPrice);
      } else {
        this.total.set(0);
      }
    });
  }

  increase(item: any) {
    item.quantity++;
    this.service.ganaxleba({ quantity: item.quantity, price: item.price, productId: item.product.id })
      .subscribe(() => this.kalataProducts());
  }

  decrease(item: any) {
    item.quantity--;
    this.service.ganaxleba({ quantity: item.quantity, price: item.price, productId: item.product.id })
      .subscribe(() => this.kalataProducts());
  }

  washlaaa(id: any) {
    this.service.washla(id).subscribe(() => this.kalataProducts());
  }
}
