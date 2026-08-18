import { IBuyer, TBuyerErrors, TPayment } from "../../types";

// Храним
export class Buyer {
    private payment: TPayment = ''; // способ оплаты
    private email: string = '';     // почту
    private phone: string = '';     // телефон
    private address: string = '';   // дом адрес

    setData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) { // проверяем переданно ли значение
            this.payment = data.payment;  // записываем перед знач
        }

        if (data.email !== undefined) {
            this.email = data.email;
        }

        if (data.phone !== undefined) {
            this.phone = data.phone;
        }

        if (data.address !== undefined) {
            this.address = data.address;
        }
    }

    getData(): IBuyer {
        return {  // возвращаем все текущ данные покупателя
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        };
    }

    clear(): void {      // очищаем данные
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    validate(): TBuyerErrors {
        const errors: TBuyerErrors = {}; // проверяем ввод данных

        if (!this.payment) {
            errors.payment = 'Не выбран способ оплаты';
        }

        if (!this.address) {
            errors.address = 'Укажите адрес';
        }

        if (!this.email) {
            errors.email = 'Укажите email';
        }

        if (!this.phone) {
            errors.phone = 'Укажите телефон';
        }

        return errors;
    }
}