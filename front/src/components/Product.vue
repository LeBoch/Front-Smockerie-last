<template>
    <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 class="text-xl font-bold text-gray-900">Customers also bought</h2>

            <!-- Message de chargement / erreur -->
            <div v-if="loading" class="mt-8 text-center text-gray-500">Chargement des produits…</div>
            <div v-if="error" class="mt-8 text-center text-red-600">{{ error }}</div>

            <!-- Grille des produits -->
            <div v-if="!loading && !error"
                class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                <div v-for="product in products" :key="product.id">
                    <div class="relative">
                        <div class="relative h-72 w-full overflow-hidden rounded-lg">
                            <img :src="product.imageUrl" :alt="product.imageAlt" class="w-full h-full object-cover" />
                        </div>
                        <div class="relative mt-4">
                            <h3 class="text-sm font-medium text-gray-900">{{ product.name }}</h3>
                            <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
                        </div>
                        <div
                            class="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                            <div aria-hidden="true"
                                class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" />
                            <p class="relative text-lg font-semibold text-white">
                                {{ product.price }}
                            </p>
                        </div>
                    </div>
                    <div class="mt-6">
                        <a :href="product.href"
                            class="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200">
                            Add to bag<span class="sr-only">, {{ product.name }}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

// URL de ton API (adapter le port si besoin)
const API_BASE = 'http://localhost:5275'

interface Product {
    id: number
    name: string
    color: string
    href: string
    imageUrl: string
    imageAlt: string
    price: string
}

const products = ref<Product[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
    loading.value = true
    error.value = null

    try {
        const response = await axios.get<Product[]>(
            `${API_BASE}/api/Products`  // ou `/api/Products` selon ta route
        )
        products.value = response.data
        console.log(products.value)
    } catch (err: any) {
        // Gestion simple de l'erreur
        if (err.response) {
            error.value = `Erreur ${err.response.status} : ${err.response.data?.message || err.response.statusText}`
        } else if (err.request) {
            error.value = 'Aucune réponse du serveur, vérifiez la connexion.'
        } else {
            error.value = err.message
        }
    } finally {
        loading.value = false
    }
})
</script>
