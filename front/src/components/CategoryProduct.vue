<template>
    <div class="min-h-screen bg-gray-50 py-12 px-4">
        <div class="max-w-6xl mx-auto">
            <h1 class="text-3xl font-extrabold text-gray-900 mb-10 text-center">Produits de la catégorie</h1>

            <div v-if="loading" class="text-center text-gray-500">Chargement des produits…</div>
            <div v-else-if="error" class="text-center text-red-500">Erreur : {{ error }}</div>

            <div v-else-if="products.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="product in products" :key="product.id"
                    class="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden flex flex-col">
                    <img :src="product.imageUrl" :alt="product.name" class="h-52 w-full object-cover" />
                    <div class="p-4 flex-1 flex flex-col justify-between">
                        <div>
                            <h2 class="text-xl font-semibold text-gray-800">{{ product.name }}</h2>
                            <p class="mt-2 text-gray-600 font-medium">{{ product.price }} €</p>
                        </div>
                        <div class="mt-4">
                            <router-link :to="`/product/${product.id}`"
                                class="inline-block w-full text-center rounded-md bg-indigo-600 px-4 py-2 text-white font-medium text-sm hover:bg-indigo-700 transition">
                                Voir le détail
                            </router-link>
                        </div>
                        <button @click="cart.addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            imageUrl: product.imageUrl
                        })" class="mt-2 w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded transition">
                            Ajouter au panier
                        </button>

                    </div>

                </div>
            </div>

            <div v-else class="text-center text-gray-500">Aucun produit trouvé pour cette catégorie.</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '../stores/useCarteStore'

interface ProductDto {
    id: number
    name: string
    price: number
    imageUrl: string
    categoryId: number
}

const API_BASE = 'http://localhost:5275'
const products = ref<ProductDto[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const route = useRoute()
const categoryId = route.params.id
const cart = useCartStore()

onMounted(async () => {
    try {
        const { data } = await axios.get<ProductDto[]>(`${API_BASE}/api/products/category/${categoryId}`)
        products.value = data
    } catch (err: any) {
        error.value = err.message || 'Erreur lors du chargement'
    } finally {
        loading.value = false
    }
})
</script>
