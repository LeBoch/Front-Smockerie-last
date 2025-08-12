<template>
  <div class="min-h-screen bg-gray-900 text-gray-200">
    <!-- Hero sombre -->
    <section class="bg-gray-800">
      <div class="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 class="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
          Bienvenue sur PuffHouse
        </h1>
        <p class="mt-4 text-lg text-gray-300">
          Découvrez nos puffs haut de gamme, conçus pour une expérience de vapotage incomparable.
        </p>
      </div>
    </section>

    <!-- Toutes les catégories -->
    <section class="mt-16 px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-white text-center">Nos catégories</h2>

      <div
        v-if="categories.length"
        class="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 justify-center"
        :class="{ 'lg:grid-cols-2': categories.length <= 2, 'lg:grid-cols-4': categories.length > 2 }"
      >
        <div
          v-for="category in categories"
          :key="category.id"
          class="group relative flex flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <div class="flex-1 p-6">
            <h3 class="text-xl font-semibold text-white">{{ category.name }}</h3>
            <p v-if="category.description" class="mt-2 text-sm text-gray-400">
              {{ category.description }}
            </p>
          </div>
          <div class="p-4 bg-orange-600 flex justify-end">
            <router-link
              :to="`/categories/${category.id}`"
              class="inline-block rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
            >
              Voir
            </router-link>
          </div>
        </div>
      </div>

      <div v-else class="mt-6 text-center text-gray-500">
        Aucune catégorie disponible pour le moment.
      </div>
    </section>

    <!-- Avis clients -->
    <section class="mt-20 px-4 sm:px-6 lg:px-8 pb-16">
      <div class="mx-auto max-w-5xl text-center">
        <h2 class="text-3xl font-bold text-white">Ils nous font confiance</h2>
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="avis in reviews"
            :key="avis.id"
            class="rounded-lg bg-gray-800 p-6 shadow hover:shadow-2xl transition-shadow duration-300"
          >
            <div class="flex items-center justify-between">
              <div class="flex">
                <StarIcon
                  v-for="n in 5"
                  :key="n"
                  :class="n <= avis.rating ? 'text-yellow-400' : 'text-gray-700'"
                  class="h-5 w-5"
                />
              </div>
              <span class="ml-3 text-sm font-medium text-gray-300">
                {{ avis.rating }} / 5
              </span>
            </div>
            <p class="mt-4 text-gray-400 italic">“{{ avis.comment }}”</p>
            <p class="mt-4 text-sm font-semibold text-white">
              — {{ avis.author }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { StarIcon } from '@heroicons/vue/24/solid'

const API_BASE = 'http://localhost:5275'

interface CategoryDto {
  id: number
  name: string
  description?: string
}

interface Review {
  id: number
  rating: number
  comment: string
  author: string
}

const categories = ref<CategoryDto[]>([])
const reviews = ref<Review[]>([
  { id: 1, rating: 5, comment: 'Super puff, vapeur dense et saveur parfaite !', author: 'Alice B.' },
  { id: 2, rating: 4, comment: 'Bonne autonomie, design soigné.', author: 'Marc L.' },
  { id: 3, rating: 5, comment: 'Je recommande pour les amateurs de puffs.', author: 'Julie R.' },
])

onMounted(async () => {
  try {
    const { data } = await axios.get<CategoryDto[]>(`${API_BASE}/api/category`)
    categories.value = data
  } catch (err: any) {
    console.error('Erreur en récupérant les catégories :', err)
  }
})
</script>

<style scoped>
/* Si tu veux un léger dégradé sur le hero */
section.bg-gray-800 {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
}
</style>
