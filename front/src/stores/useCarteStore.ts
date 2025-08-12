// src/stores/useCartStore.ts
import { defineStore } from 'pinia'

interface CartItem {
  id: number
  name: string
  price: number
  imageUrl: string
  quantity: number
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  actions: {
    loadCartFromStorage() {
      const stored = localStorage.getItem('cart')
      if (stored) {
        try {
          this.items = JSON.parse(stored)
        } catch {
          localStorage.removeItem('cart')
        }
      }
    },

    saveCartToStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    addToCart(product: Omit<CartItem, 'quantity'>) {
      const existing = this.items.find(i => i.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.saveCartToStorage()
    },

    removeFromCart(id: number) {
      this.items = this.items.filter(item => item.id !== id)
      this.saveCartToStorage()
    },

    clearCart() {
      this.items = []
      this.saveCartToStorage()
    },
  },

  getters: {
    total: state => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    itemCount: state => state.items.reduce((n, i) => n + i.quantity, 0),
  },
})
