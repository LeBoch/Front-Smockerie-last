<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div v-if="loading" class="text-gray-500">Chargement…</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else-if="product" class="max-w-2xl mx-auto bg-white p-6 shadow rounded">
      <img :src="product.imageUrl" :alt="product.name" class="w-full h-64 object-cover rounded mb-4" />
      <h1 class="text-2xl font-bold text-gray-900">{{ product.name }}</h1>
      <p class="mt-2 text-gray-700">{{ product.price }} €</p>
      <p class="mt-4 text-sm text-gray-500">Catégorie ID : {{ product.categoryId }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

interface ProductDto {
  id: number
  name: string
  price: number
  imageUrl: string
  categoryId: number
}

const API_BASE = 'http://localhost:5275'
const product = ref<ProductDto | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const route = useRoute()
const productId = route.params.id

onMounted(async () => {
  try {
    const { data } = await axios.get<ProductDto>(`${API_BASE}/api/products/${productId}`)
    product.value = data
  } catch (err: any) {
    error.value = err.message || 'Erreur lors du chargement'
  } finally {
    loading.value = false
  }
})
</script>
