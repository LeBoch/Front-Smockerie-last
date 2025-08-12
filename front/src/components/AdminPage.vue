<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <h1 class="text-3xl font-bold text-gray-900">Bienvenue sur l’espace Admin</h1>
    <p class="mt-4 text-gray-600">Vous êtes connecté avec succès.</p>

    <!-- Formulaire de création / modification -->
    <div class="mt-8 bg-white p-6 rounded shadow">
      <h2 class="text-xl font-semibold mb-4">
        {{ isEdit ? 'Modifier' : 'Ajouter' }} un produit
      </h2>
      <form @submit.prevent="onSubmit">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1">Nom</label>
            <input v-model="form.name" required class="w-full border px-2 py-1 rounded"/>
          </div>
          <div>
            <label class="block mb-1">Prix (€)</label>
            <input type="number" v-model.number="form.price" step="0.01" required class="w-full border px-2 py-1 rounded"/>
          </div>
          <div>
            <label class="block mb-1">Stock</label>
            <input type="number" v-model.number="form.stock" required class="w-full border px-2 py-1 rounded"/>
          </div>
          <div>
            <label class="block mb-1">Image URL</label>
            <input v-model="form.imageUrl" class="w-full border px-2 py-1 rounded"/>
          </div>
          <div>
            <label class="block mb-1">Catégorie</label>
            <input type="number" v-model.number="form.categoryId" required class="w-full border px-2 py-1 rounded"/>
          </div>
          <div>
            <label class="block mb-1">Goût</label>
            <input type="number" v-model.number="form.flavorId" required class="w-full border px-2 py-1 rounded"/>
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <button type="submit"
                  class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            {{ isEdit ? 'Enregistrer' : 'Créer' }}
          </button>
          <button type="button" @click="resetForm"
                  class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Annuler
          </button>
        </div>
      </form>
    </div>

    <!-- Liste des produits -->
    <div class="mt-8 bg-white p-6 rounded shadow">
      <h2 class="text-xl font-semibold mb-4">Liste des produits</h2>
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-2 py-1">Nom</th>
            <th class="border px-2 py-1">Prix</th>
            <th class="border px-2 py-1">Stock</th>
            <th class="border px-2 py-1">Catégorie</th>
            <th class="border px-2 py-1">Goût</th>
            <th class="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in products" :key="p.id">
            <td class="border px-2 py-1">{{ p.name }}</td>
            <td class="border px-2 py-1">{{ p.price.toFixed(2) }} €</td>
            <td class="border px-2 py-1">{{ p.stock }}</td>
            <td class="border px-2 py-1">{{ p.categoryId }}</td>
            <td class="border px-2 py-1">{{ p.flavorId }}</td>
            <td class="border px-2 py-1 space-x-1">
              <button @click="onEdit(p)"
                      class="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500">
                ✏️
              </button>
              <button @click="onDelete(p.id!)"
                      class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_BASE = 'http://localhost:5275'

interface Product {
  id: number
  name: string
  price: number
  stock: number
  imageUrl: string
  categoryId: number
  flavorId: number
}

interface ProductCreateDto {
  name: string
  price: number
  stock: number
  imageUrl: string
  categoryId: number
  flavorId: number
}

const products = ref<Product[]>([])

const form = ref<ProductCreateDto>({
  name: '',
  price: 0,
  stock: 0,
  imageUrl: '',
  categoryId: 0,
  flavorId: 0,
})

const isEdit = ref(false)
const currentId = ref<number | null>(null)

async function loadProducts() {
  const res = await axios.get<Product[]>(`${API_BASE}/api/Products`)
  products.value = res.data
}

function onEdit(product: Product) {
  form.value = {
    name: product.name,
    price: product.price,
    stock: product.stock,
    imageUrl: product.imageUrl,
    categoryId: product.categoryId,
    flavorId: product.flavorId
  }
  currentId.value = product.id
  isEdit.value = true
}

function resetForm() {
  form.value = {
    name: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    categoryId: 0,
    flavorId: 0
  }
  currentId.value = null
  isEdit.value = false
}

async function onSubmit() {
  if (isEdit.value && currentId.value !== null) {
    await axios.put(`${API_BASE}/api/Products/${currentId.value}`, form.value)
  } else {
    await axios.post(`${API_BASE}/api/Products`, form.value)
  }

  resetForm()
  await loadProducts()
}

async function onDelete(id: number) {
  if (!confirm('Voulez-vous vraiment supprimer ce produit ?')) return
  await axios.delete(`${API_BASE}/api/Products/${id}`)
  await loadProducts()
}

onMounted(loadProducts)
</script>
