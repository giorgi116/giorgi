import { Component, signal } from '@angular/core';
import { Service } from '../service';
import { FormsModule } from '@angular/forms';
import { Categories } from '../categories/categories';
import { Products } from '../products';
import { CategoriesFilter } from '../categories-filter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule, Categories],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(public service: Service, public router: Router) {
    this.showproducts();
    this.showAllKalata();
    this.chooseCategory();
  }

  spiciness: any = '';
  nuts: string = '';
  vegeterian: string = '';
  activeCategory: number | string = 0;
  allproducts = signal<Products[]>([]);
  filterOpen = true; 

  scrollToMenu() {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  }

  showproducts() {
    this.service.products().subscribe((data: Products[]) => {
      this.allproducts.set(data);
    });
  }

  chooseCategory() {
    this.service.gadamcemi.subscribe((id: number) =>
      id == 0
        ? this.showproducts()
        : this.service.catid(id)
            .subscribe((data: CategoriesFilter) => this.allproducts.set(data.products))
    );
  }

  filter() {
    if (this.spiciness == '-1') this.spiciness = '';
    if (this.activeCategory == 0) this.activeCategory = '';
    this.service
      .filterFoods(this.spiciness, this.nuts, this.vegeterian, this.activeCategory)
      .subscribe((data: any) => this.allproducts.set(data));
  }

  showAllKalata() {
    this.service.kalata().subscribe((data: any) => {
      this.service.trailer.next(data.length);
    });
  }

  addToCart(item: any) {
    if (!this.service.isLoggedIn()) {
      alert('Please sign in to add items to your cart.');
      this.router.navigate(['/auth']);
      return;
    }
    let info = { quantity: 1, price: item.price, productId: item.id };
    this.service.kalata().subscribe((kalataData: any) => {
      let napovni = kalataData.find((k: any) => k.product.id == item.id);
      if (napovni) {
        napovni.quantity++;
        this.service.ganaxleba({ quantity: napovni.quantity, price: item.price, productId: item.id })
          .subscribe(() => this.showAllKalata());
      } else {
        this.service.damateba(info).subscribe(() => this.showAllKalata());
      }
    });
  }
}
