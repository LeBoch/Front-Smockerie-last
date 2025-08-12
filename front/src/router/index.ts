import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Product from '../components/Product.vue'
import Home from '../components/Home.vue'
import ProductDetails from '../components/ProductDetails.vue'
import CategoryProduct from '../components/CategoryProduct.vue'
import CartView from '../components/CartView.vue'
import AdminPage from '../components/AdminPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login',   name: 'Login', component: Login },
    { path: '/product',   name: 'Product', component: Product },
    { path: '/product/:id',   name: 'ProductDetails', component: ProductDetails },
    { path: '/',   name: 'Home', component: Home },
    { path: '/categories/:id', name: 'CategoryDetail', component: CategoryProduct },
    { path: '/panier', name: 'Cart', component: CartView },
{ path: '/admin', name: 'Admin', component: AdminPage }, // ✅
  ]
})
