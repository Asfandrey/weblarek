import './scss/styles.scss';

import { Api } from './components/base/Api';
import { WebLarekApi } from './components/services/WebLarekApi';
import { ProductCatalog } from './components/models/ProductCatalog';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';

import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';

const productCatalog = new ProductCatalog(); // модель каталога
const basket = new Basket();
const buyer = new Buyer();

// Тестирование методов ProductCatalog


productCatalog.setProducts(apiProducts.items);

console.log(
    'Массив товаров из каталога:',
    productCatalog.getProducts()
);

const firstProduct = apiProducts.items[0];

console.log(
    'Товар, найденный по id:',
    productCatalog.getProductById(firstProduct.id)
);

console.log(
    'Поиск несуществующего товара:',
    productCatalog.getProductById('wrong-id')
);

productCatalog.setSelectedProduct(firstProduct);

console.log(
    'Товар, выбранный для подробного отображения:',
    productCatalog.getSelectedProduct()
);

// Тестирование методов Basket

console.log(
    'Корзина до добавления товаров:',
    basket.getProducts()
);

basket.addProduct(apiProducts.items[0]);

console.log(
    'Товары в корзине после добавления первого товара:',
    basket.getProducts()
);

console.log(
    'Стоимость товаров в корзине:',
    basket.getTotalPrice()
);

console.log(
    'Количество товаров в корзине:',
    basket.getProductsCount()
);

console.log(
    'Первый товар находится в корзине:',
    basket.hasProduct(apiProducts.items[0].id)
);

console.log(
    'Несуществующий товар находится в корзине:',
    basket.hasProduct('wrong-id')
);

basket.addProduct(apiProducts.items[1]);

console.log(
    'Товары после добавления второго товара:',
    basket.getProducts()
);

console.log(
    'Количество товаров после добавления второго товара:',
    basket.getProductsCount()
);

console.log(
    'Общая стоимость после добавления второго товара:',
    basket.getTotalPrice()
);

basket.removeProduct(apiProducts.items[0]);

console.log(
    'Корзина после удаления первого товара:',
    basket.getProducts()
);

console.log(
    'Удалённый товар находится в корзине:',
    basket.hasProduct(apiProducts.items[0].id)
);

basket.clear();

console.log(
    'Корзина после очистки:',
    basket.getProducts()
);

console.log(
    'Количество товаров после очистки:',
    basket.getProductsCount()
);

// Тестирование методов Buyer

console.log(
    'Начальные данные покупателя:',
    buyer.getData()
);

console.log(
    'Ошибки валидации пустых данных покупателя:',
    buyer.validate()
);

buyer.setData({
    address: 'Таллин, улица Тестовая, 10',
});

console.log(
    'Данные покупателя после сохранения адреса:',
    buyer.getData()
);

buyer.setData({
    payment: 'online',
});

console.log(
    'Данные покупателя после выбора способа оплаты:',
    buyer.getData()
);

buyer.setData({
    email: 'test@example.com',
});

console.log(
    'Данные покупателя после сохранения email:',
    buyer.getData()
);

buyer.setData({
    phone: '+37255555555',
});

console.log(
    'Полностью заполненные данные покупателя:',
    buyer.getData()
);

console.log(
    'Ошибки валидации после заполнения всех полей:',
    buyer.validate()
);

buyer.clear();

console.log(
    'Данные покупателя после очистки:',
    buyer.getData()
);


// Работа с сервером

const api = new Api(API_URL); // базовый api
const webLarekApi = new WebLarekApi(api); // передаем его в коммуникационный класс

// Получаем товары с сервера
webLarekApi
    .getProducts()
    .then((data) => { 
    // data — объект IProductsResponse, полученный с сервера.
    // data.items — массив товаров IProduct[]
    
        productCatalog.setProducts(data.items); 

        console.log(
            'Каталог товаров, полученный с сервера:',
            productCatalog.getProducts()
        );
    })
    .catch((error) => {
        console.error('Ошибка при получении товаров:', error);
    });


