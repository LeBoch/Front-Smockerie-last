<template>
  <header class="bg-gray-900 text-gray-100 shadow-md">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/">
            <img
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              alt="Logo"
              class="h-8 w-auto"
            />
          </router-link>
        </div>

        <!-- Barre de recherche -->
        <div class="hidden md:flex flex-1 px-4 lg:px-8">
          <div class="w-full max-w-lg mx-auto">
            <div class="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                class="w-full bg-gray-800 placeholder-gray-500 text-gray-100 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <svg
                class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Icônes à droite -->
        <div class="flex items-center space-x-6">
          <!-- Panier -->
          <router-link to="/panier" class="relative hover:text-white transition">
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-6-9v9" />
            </svg>
            <span
              v-if="cart.itemCount > 0"
              class="absolute -top-2 -right-3 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
            >
              {{ cart.itemCount }}
            </span>
          </router-link>

          <!-- Admin / Connexion -->
          <router-link
            v-if="isLoggedIn"
            to="/admin"
            class="flex items-center hover:text-white transition"
          >
            <UserIcon class="w-6 h-6" />
            <span class="ml-1 hidden sm:inline">Admin</span>
          </router-link>
          <router-link
            v-else
            to="/login"
            class="flex items-center hover:text-white transition"
          >
            <UserIcon class="w-6 h-6" />
            <span class="ml-1 hidden sm:inline">Connexion</span>
          </router-link>

          <!-- Menu mobile -->
          <button @click="$emit('toggle-mobile-menu')" class="md:hidden hover:text-white transition">
            <Bars3Icon class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Zone pour drawer / mobile menu -->
  <router-view />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '../src/stores/useCarteStore'
import { UserIcon, Bars3Icon } from '@heroicons/vue/24/outline'

const cart = useCartStore()
cart.loadCartFromStorage()

const isLoggedIn = computed(() => !!localStorage.getItem('jwt_token'))
</script>

<style scoped>
/* Accent orange sur focus */
input:focus {
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.5);
}
</style>
