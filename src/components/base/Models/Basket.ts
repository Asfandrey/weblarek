import { IProduct } from "../../../types";

// Массив выбранных товаров
export class Basket {
    private products: IProduct[] = [];

    getProducts(): IProduct[] {
        return this.products;
    }

    addProduct(product: IProduct): void { // добавить товар
        this.products.push(product);
    }

    removeProduct(product: IProduct): void {  // удалить товар
        this.products = this.products.filter(
            (item) => item.id !== product.id
        );
    }

    clear(): void {           // Очистить корзину
        this.products = [];
    }

    getTotalPrice(): number {   // Посчитать общ стоимость
        return this.products.reduce(
            (total, product) => total + (product.price ?? 0), // Если product.price равен null или undefined, используй 0.
            0
        );
    }

    getProductsCount(): number {     // Посчитать количество товаров
        return this.products.length;
    }

    hasProduct(id: string): boolean {  // Проверить наличие тов в корзине
        return this.products.some((product) => product.id === id);
    }
}