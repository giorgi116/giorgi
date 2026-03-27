import { Products } from "./products";

export interface CategoriesFilter {
    id: number,
    name: string,
    products: Products[]
}
