export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(
        uri: string,
        data: object,
        method?: ApiPostMethods
    ): Promise<T>;
}

// Тип способа оплаты покупателя
export type TPayment = 'online' | 'cash' | '';

// Данные товара
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

// Ответ сервера при получении каталога товаров
export interface IProductsResponse {
    total: number;
    items: IProduct[];
}

// Данные покупателя
export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

// Возможные ошибки в данных покупателя
export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

// Данные заказа,  которые уходят на сервер
export interface IOrder extends IBuyer {
    total: number;
    items: string[];
}

// Ответ сервера после успешного оформления заказа
export interface IOrderResult {
    id: string;
    total: number;
}





