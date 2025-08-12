<template>
  <div class="max-w-4xl mx-auto py-12 px-4">
    <h1 class="text-2xl font-bold mb-6">Mon panier</h1>

    <div v-if="!cart.items.length" class="text-gray-500">Votre panier est vide.</div>

    <div v-else>
      <div v-for="item in cart.items" :key="item.id" class="flex justify-between items-center border-b py-4">
        <div class="flex items-center gap-4">
          <img :src="item.imageUrl" class="h-16 w-16 rounded object-cover" />
          <div>
            <p class="font-semibold">{{ item.name }}</p>
            <p class="text-sm text-gray-600">{{ item.price }} € x {{ item.quantity }}</p>
          </div>
        </div>
        <button @click="cart.removeFromCart(item.id)" class="text-red-600 hover:underline text-sm">
          Supprimer
        </button>
      </div>

      <div class="mt-6 text-right font-bold text-lg">
        Total : {{ cart.total }} €
      </div>

      <button @click="cart.clearCart" class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Vider le panier
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/useCarteStore'
const cart = useCartStore()
</script>
