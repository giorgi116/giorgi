import { Component, signal } from '@angular/core';
import { Service } from '../service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  constructor(public service: Service) {
    this.showcategories()
  }

   allcategories = signal<any[]>([])

   currentCategory: number = 0

    showcategories(){
    this.service.categories().subscribe( (data:any) => {
      console.log(data);
      this.allcategories.set(data)
    })
  }


  changeCategories(id:number) {
    this.currentCategory = id
    this.service.gadamcemi.next(id)
    
  }
}
