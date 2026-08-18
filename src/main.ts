import './scss/styles.scss';

import { Api } from './components/base/Api';
import { WebLarekApi } from './components/base/WeblarekApi';
import { ProductCatalog } from './components/base/Models/ProductCatalog';

import { API_URL } from './utils/constants';

const api = new Api(API_URL); // базовый api
const webLarekApi = new WebLarekApi(api); // передаем его в коммуникационный класс
const productCatalog = new ProductCatalog(); // модель каталога

// Получаем товары с сервера
webLarekApi
    .getProducts()
    .then((data) => { // data — объект IProductsResponse, полученный с сервера.
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


