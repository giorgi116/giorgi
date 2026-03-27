import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Products } from './products';
import { CategoriesFilter } from './categories-filter';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class Service {

  constructor(private http: HttpClient, public cookies: CookieService) {}

  public trailer: Subject<number> = new Subject();
  public gadamcemi: Subject<any> = new Subject();

 
  registerLogic(item: any) {
    return this.http.post('https://api.everrest.educata.dev/auth/sign_up', item);
  }

  loginLogic(item: any) {
    return this.http.post('https://api.everrest.educata.dev/auth/sign_in', item);
  }

  profileInfo() {
    return this.http.get('https://api.everrest.educata.dev/auth', {
      headers: { Authorization: `Bearer ${this.cookies.get('user')}` },
    });
  }

  isLoggedIn(): boolean {
    return !!this.cookies.get('user');
  }

  logout() {
    this.cookies.delete('user');
  }


  products() {
    return this.http.get<Products[]>('https://restaurant.stepprojects.ge/api/Products/GetAll');
  }

  categories() {
    return this.http.get('https://restaurant.stepprojects.ge/api/Categories/GetAll');
  }

  catid(id: any) {
    return this.http.get<CategoriesFilter>(
      `https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`
    );
  }

  filterFoods(sicxare: any, nuts: any, veget: any, category: any) {
    return this.http.get(
      `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${veget}&nuts=${nuts}&spiciness=${sicxare}&categoryId=${category}`
    );
  }

 
  kalata() {
    return this.http.get('https://restaurant.stepprojects.ge/api/Baskets/GetAll');
  }

  damateba(info: any) {
    return this.http.post('https://restaurant.stepprojects.ge/api/Baskets/AddToBasket', info);
  }

  ganaxleba(info: any) {
    return this.http.put('https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket', info);
  }

  washla(id: any) {
    return this.http.delete(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`);
  }
}
